import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { RefreshControl, Alert, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { GAME_FRAGMENT } from "../../fragments";
import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import GameItem from "../../components/match/GameItem";

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
      homeGame {
        ...GameFragment
        entryNumber
        isEntry
      }
      awayGame {
        ...GameFragment
        entryNumber
        isEntry
      }
      commentNumber
    }
  }
  ${GAME_FRAGMENT}
`;

const joinBtnHeight = '60px'
const JoinGameContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: ${joinBtnHeight};
  width: 100%;
  align-items: center;
  border-top: 1px solid ${commonTheme.emerald};
  padding: 5px 0px;
`;
const JoinGame = styled.TouchableOpacity`
  width: 200px;
  height: 50px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$joinGame ? commonTheme.blue : commonTheme.grey03)};
`;
const BtnText = styled.Text`
  color: ${(props) => (props.$joinGame ? commonTheme.white : commonTheme.black)};
  font-weight: 600;
  font-size: 15px;
`;

export default function GameMatch({ route }) {
  const navigation = useNavigation();
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
  const { data, loading, refetch } = useQuery(SEE_GAME, {
    variables: {
      id: route?.params?.matchId,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: data?.seeGame?.user.username,
      id: data?.seeGame?.user.id,
    });
  };
  const joinGameAlert = () => Alert.alert(
    'Please join another game',
    'This game is already joined by another club.', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
  const { width } = useWindowDimensions();
  console.log(route);
  console.log(data);
  return (
    <ScreenLayout loading={loading}>  
      <ScrollView>
        <GameItem {...data?.seeGame} />
      </ScrollView>    

      {!data?.seeGame?.awayGame?.id ? (
        <JoinGameContainer>
          <JoinGame
            $joinGame
            onPress={() => navigation.navigate("SelectAway", {
              matchId: route?.params?.matchId,
              userId: data?.seeGame?.user.id,
            })}
          >
            <BtnText $joinGame>Join Game</BtnText>
          </JoinGame>
        </JoinGameContainer>
      ) : (
        <JoinGameContainer>
          <JoinGame onPress={joinGameAlert}>
            <BtnText>Join Game</BtnText>
          </JoinGame>
        </JoinGameContainer>
      )}
    </ScreenLayout>
  )
}
