import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { View, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import SelectClubItem from "../../components/match/SelectClubItem";

const SEE_MY_CLUB = gql`
  query seeMyClub($offset: Int!) {
    seeMyClub(offset: $offset) {
      id
      club {
        id
        clubname
        emblem
      }
    }
  }
`;

const HeaderRightText = styled.Text`
  color: ${commonTheme.blue};
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
  const { data } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  const [chosenId, setChosenId] = useState("");
  const [chosenClub, setChosenClub] = useState("");
  const [chosenClubname, setChosenClubname] = useState("");
  const [chosenEmblem, setChosenEmblem] = useState("");

  const HeaderRight = () => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("NewMatch", {
        id: chosenId,
        clubId: chosenClub,
        clubname: chosenClubname,
        emblem: chosenEmblem,
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

  const chooseClub = (id, clubId, clubname, emblem) => {
    setChosenId(id)
    setChosenClub(clubId);
    setChosenClubname(clubname);
    setChosenEmblem(emblem);
  };

  const renderMyClubs = ({ item: myClubs }) => {
    return(
      <TouchableOpacity>
        <SelectClubItem
          onPress={() => chooseClub(
            myClubs.id,
            myClubs.club.id, 
            myClubs.club.clubname,
            myClubs.club.emblem,
          )}
          id={ myClubs.id }
          clubId={{ clubId: myClubs.club.id }}
          clubname={ myClubs.club.clubname }
          emblem={ myClubs.club.emblem }
        />
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <Top>
        {chosenClubname !== "" ? (
          <ClubData>
            {chosenEmblem ? (
              <Emblem source={{ uri: chosenEmblem }} />
            ) : (
              <Emblem source={require('../../data/2bar.jpg')} />
            )}
            <ClubnameText numberOfLines={1}>{chosenClubname}</ClubnameText>
          </ClubData>
        ) : null}
      </Top>
      <FlatList
        data={data?.seeMyClub}
        keyExtractor={(myClubs) => "" + myClubs.id}
        renderItem={renderMyClubs}
      />
    </View>
  )
}
