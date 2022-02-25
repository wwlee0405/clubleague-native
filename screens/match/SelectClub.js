import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import SelectClubItem from "../../components/match/SelectClubItem";

const Top = styled.View`
  background-color: red;
`;
const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function SelectClub({ navigation, route }) {
  const { data: meData } = useMe();

  const [chosenClub, setChosenClub] = useState("");

  const HeaderRight = () => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("NewMatch", {
        file: chosenClub,
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
          onPress={() => chooseClub(myClubs.id)}
          {...myClubs}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Top>
        {chosenClub !== "" ? (
          <Image
            source={{ id: chosenClub }}
            style={{ width: 30, height: 30 }}
          />
        ) : null}
      </Top>
      <FlatList
        data={meData?.me?.userMember}
        keyExtractor={(myClubs) => "" + myClubs.id}
        renderItem={renderMyClubs}
      />
    </View>
  )
}
