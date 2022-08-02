import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Game from "../../components/match/Game";
import { colors } from "../../colors";

const SEE_GAME = gql`
  query seeGame($id: Int!) {
    seeGame(id: $id) {
      id
      user {
        id
        avatar
        username
      }
      file
      caption
      games {
        id
        joinedGame
        club {
          clubname
          emblem
          isJoined
          clubMember {
            user {
              id
              username
              isMe
            }
          }
        }
      }
      entryNumber
      commentNumber
      clubsInGame
    }
  }
`;

export default function GameMatch({ route }) {
  const { data } = useQuery(SEE_GAME, {
    variables: {
      id: route?.params?.matchId,
    },
  });
  console.log(data);
  return (
    <View>
      <Game {...data?.seeGame} />
    </View>
  )
}
