import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { View, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components/native";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import SelectClubItem from "../../components/match/SelectClubItem";
import HeaderRight from "../../components/shared/HeaderRight";

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
const JOIN_AWAY_GAME_MUTATION = gql`
  mutation joinAwayGame($id: Int!, $matchId: Int!, $clubId: Int!, $userId: Int) {
    joinAwayGame(id:$id, matchId: $matchId, clubId: $clubId, userId: $userId) {
      error
      id
      ok
    }
  }
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
  const { data } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  const [chosenId, setChosenId] = useState("");
  const [chosenClub, setChosenClub] = useState("");
  const [chosenClubname, setChosenClubname] = useState("");
  const [chosenEmblem, setChosenEmblem] = useState("");

  const joinAwayGameUpdate = (cache, result) => {
    const {
      data: {
        joinAwayGame: { ok, id },
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
      navigation.navigate("GameFeed", {
        matchId: route?.params?.matchId
      });
    };
  }
  const [joinAwayGame] = useMutation(JOIN_AWAY_GAME_MUTATION, {
    variables: {
      id: chosenId,
      clubId: chosenClub,
      matchId: route?.params?.matchId,
      userId: route?.params?.userId,
    },
    update: joinAwayGameUpdate,
  });
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={joinAwayGame} />
      ),
    });
  }, [chosenId, chosenClub]);

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
