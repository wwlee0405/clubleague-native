import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import SelectClubItem from "../../components/match/SelectClubItem";

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const Top = styled.View`
  padding-horizontal: 15px;
`;
const ClubData = styled.View`
  flex-direction: row;
  width: 260px;
  height: 50px;
  align-items: center;
`;
const Emblem = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const ClubnameText = styled.Text`
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;

export default function SelectClub({ navigation, route }) {
  const { data: meData } = useMe();

  const [chosenClub, setChosenClub] = useState("");

  const HeaderRight = () => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("NewMatch", {
        homeClub: chosenClub,
      })
    }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenClub]);

  const chooseClub = (id) => {
    setChosenClub(id);
  };

  const renderMyClubs = ({ item: myClubs }) => {
    return(
      <TouchableOpacity>
        <SelectClubItem
          onPress={() => chooseClub(myClubs.club.clubname)}
          {...myClubs}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Top>
        {chosenClub !== "" ? (
          <ClubData>
            <Emblem source={require('../../data/gggg.jpg')} />
            <ClubnameText numberOfLines={1}>{chosenClub}</ClubnameText>
          </ClubData>
        ) : null}
      </Top>
      <FlatList
        data={meData?.me?.userMember}
        keyExtractor={(myClubs) => "" + myClubs.club.clubname}
        renderItem={renderMyClubs}
      />
    </View>
  )
}
