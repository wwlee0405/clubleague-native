import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { RefreshControl, View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Game from "../../components/match/Game";
import HeaderAvatar from "../../components/HeaderAvatar.js";
import HomeAway from "../../components/match/HomeAway";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const ExtraContainer = styled.View`
  padding-bottom: 10px;
`;

const Dates = styled.View`
  padding-top: 10px;
  align-items: flex-start;
  padding-left: 15px;
`;
const MatchDate = styled.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 35px;
`;
const MatchWeek = styled.Text`
  color: ${colors.black};
  font-weight: 600;
  font-size: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const TimeLocationWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TimeLocation = styled.Text`
  color: ${colors.darkGrey};
  padding-left: 3px;
`;
const AwayBtn = styled.View`
  border-radius: 15px;
  background-color: ${colors.grey01};
  margin: 5px;
  padding: 15px 20px;
  elevation: 2;
`;
const AwayText = styled.Text`
  color: ${colors.yellow};
  font-weight: 600;
  font-size: 25px;
`;
const BodyTextWrap = styled.View`
  padding-top: 10px;
  padding-horizontal: 15px;
`;
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 10px;
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
const homeAwayColor = {
  main: colors.yellow
};

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
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: data?.seeGame?.user.username,
      id: data?.seeGame?.user.id,
    });
  };
  return (
    <Container>
      <ScrollView>
        <HeaderAvatar
          onPress={goToProfile}
          avatar={data?.seeGame?.user?.avatar}
          topData={data?.seeGame?.user?.username}
          bottomData="Seoul, Korea"
        />
        <ExtraContainer>
          <Dates>
            <MatchDate>APR 23</MatchDate>
            <MatchWeek>Saturday</MatchWeek>
            <TimeLocationWrap>
              <Feather name="clock" size={15} color={colors.darkGrey} />
              <TimeLocation>14:00 - 16:00</TimeLocation>
            </TimeLocationWrap>
            <TimeLocationWrap>
              <Feather name="map-pin" size={15} color={colors.darkGrey} />
              <TimeLocation>Camp Nou</TimeLocation>
            </TimeLocationWrap>
          </Dates>

          <Text>{data?.seeGame?.clubsInGame}</Text>

          <HomeAway
            labelText="Home"
            clubname={data?.seeGame?.games[0].club?.clubname}
            goToEntry={() => navigation.navigate("Entry", {
              gameId: data?.seeGame?.games[0].id,
            })}
            entryNumber={data?.seeGame?.games[0].entryNumber}
          />
          {data?.seeGame?.clubsInGame === 2 ?
            <HomeAway
              homeAwayColor={homeAwayColor}
              labelText="Away"
              clubname={data?.seeGame?.games[1].club?.clubname}
              goToEntry={() => navigation.navigate("Entry", {
                gameId: data?.seeGame?.games[1].id,
              })}
              entryNumber={data?.seeGame?.games[1].entryNumber}
            />
            :
            <AwayBtn>
              <AwayText>Away</AwayText>
            </AwayBtn>
          }

          <Image source={require('../../data/bbbb.jpg')} style={{ height: 500, width: 300 }} />

          <BodyTextWrap>
            <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
          </BodyTextWrap>

          <View style={{ paddingTop: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Comments", {
              matchId: data?.seeGame?.id,
            })}>
              <CommentCount>{data?.seeGame?.commentNumber === 1 ? "1 comment" : `${data?.seeGame?.commentNumber} comments`}</CommentCount>
            </TouchableOpacity>
          </View>

        </ExtraContainer>


      </ScrollView>
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
