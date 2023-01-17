import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Game from "../../components/match/Game";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
`;
const JoinGameContainer = styled.View`
  background-color: ${colors.white};
  height: 60px;
  width: 100%;
  border-top: 1px solid ${colors.emerald};
  padding-top: 15px;
  padding-bottom: 10px;
`;
const JoinGame = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;
const BtnText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
  font-size: 15px;
`;

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
        club {
          clubname
        }
        entryNumber
      }
      commentNumber
      clubsInGame
    }
  }
`;

export default function GameMatch({ route }) {
  const navigation = useNavigation();
  const { data } = useQuery(SEE_GAME, {
    variables: {
      id: route?.params?.matchId,
    },
  });
  console.log(data?.seeGame?.games[0].club.clubname);
  return (
    <Container>

        <Game {...data?.seeGame} />

      <JoinGameContainer>
        <JoinGame onPress={() => navigation.navigate("SelectAway", {
          matchId: route?.params?.matchId,
        })}>
          <BtnText>Join Game</BtnText>
        </JoinGame>
      </JoinGameContainer>
    </Container>
  )
}
