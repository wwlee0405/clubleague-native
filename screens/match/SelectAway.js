import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
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

const JOIN_GAME_MUTATION = gql`
  mutation joinGame($matchId: Int!, $clubId: Int!) {
    joinGame(matchId: $matchId, clubId: $clubId) {
      ok
      error
      id
    }
  }
`;

export default function SelectAway({ navigation, route, id, matchId }) {
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

    if (ok && meData?.me) {
      const joinAway = {
        __typename: "Game",
        createdAt: Date.now() + "",
        id,
        club: {
          clubname,
          emblem,
        },
        match: {
        },
        joinedGame: true,
      };
      const newCacheAway = cache.writeFragment({
        data: joinAway,
        fragment: gql`
          fragment BSName on Game {
            id
            joinedGame
            club {
              clubname
              emblem
            }
            match{
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: `Match:${matchId}`,
        fields: {
          games(prev) {
            return [...prev, newCacheAway];
          },
          clubsInGame(prev) {
            return prev + 1;
          },
        },
      });
      navigation.navigate("GameMatch", {
        clubId: chosenClub,
        matchId: id
      });
    };
    
  }

  const [joinGame] = useMutation(JOIN_GAME_MUTATION, {
    variables: {
      clubId: chosenClub,
      matchId: route?.params?.matchId
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
        keyExtractor={(myClubs) => "" + myClubs.club.id}
        renderItem={renderMyClubs}
      />
    </View>
  )
}
