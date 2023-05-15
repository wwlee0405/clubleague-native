import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import SelectClubItem from "../../components/match/SelectClubItem";

const JOIN_GAME_MUTATION = gql`
  mutation joinGame($matchId: Int!, $clubId: Int!, $userId: Int) {
    joinGame(matchId: $matchId, clubId: $clubId, userId: $userId) {
      ok
      error
      id
    }
  }
`;

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

export default function SelectAway({ navigation, route }) {
  const { data: meData } = useMe();
  const [chosenClub, setChosenClub] = useState("");

  console.log(route);
  console.log(chosenClub);


  const joinGameUpdate = (cache, result) => {
    const {
      data: {
        joinGame: { ok, id },
      },
    } = result;
    if (ok) {
      const joinAway = {
        __typename: "Game",
        id,
        joinedGame: true,
        createdAt: Date.now() + "",
      };
      const newCacheAway = cache.writeFragment({
        data: joinAway,
        fragment: gql`
          fragment JoinAway on Game {
            id
            joinedGame
            createdAt
          }
        `,
      });
      cache.modify({
        id: `Match:${route?.params?.matchId}`,
        fields: {
          games(prev) {
            return [...prev, newCacheAway];
          },
          clubNumInMatch(prev) {
            return prev + 1;
          },
        },
      });
      navigation.navigate("GameMatch", {
        matchId: route?.params?.matchId
      });
    };
  }
  const [joinGame] = useMutation(JOIN_GAME_MUTATION, {
    variables: {
      clubId: chosenClub,
      matchId: route?.params?.matchId,
      userId: route?.params?.userId,
    },
    update: joinGameUpdate,
  });
  const HeaderRight = () => (
    <TouchableOpacity onPress={joinGame}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenClub]);

  const chooseClub = (clubId) => {
    setChosenClub(clubId);
  };
  const renderMyClubs = ({ item: myClubs }) => {
    return(
      <TouchableOpacity>
        <SelectClubItem
          onPress={() => chooseClub(myClubs.club.id)}

          clubId={{ clubId: myClubs.club.id }}
          clubname={myClubs.club.clubname}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScreenLayout>
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
        keyExtractor={(myClubs) => "" + myClubs.club.id}
        renderItem={renderMyClubs}
      />
    </ScreenLayout>
  )
}
