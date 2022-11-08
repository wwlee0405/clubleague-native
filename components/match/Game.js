import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import HeaderAvatar from "../HeaderAvatar.js";
import GameItem from "./GameItem";
import Comments from "./Comments";

const Container = styled.View``;
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

const BodyTextWrap = styled.View`
  padding-top: 10px;
  padding-horizontal: 15px;
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
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 10px;
`;

function Game({ id, user, clubsInGame, games, entryNumber, clubId, caption, commentNumber }) {
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  return (
    <Container>
      <HeaderAvatar
        onPress={goToProfile}
        avatar={user?.avatar}
        topData={user?.username}
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

        <TimeLocation>{clubsInGame}</TimeLocation>


       <GameItem
          games={games}
          entryNumber={entryNumber}
        />


        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <JoinGame onPress={() => navigation.navigate("SelectAway", {
            matchId: id,
            clubId,
          })}>
            <BtnText>Join Game</BtnText>
          </JoinGame>
        </View>

        <Text>file</Text>
        <BodyTextWrap>
          <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
        </BodyTextWrap>

        <View style={{ paddingTop: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Comments", {
            matchId: id,
          })}>
            <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
          </TouchableOpacity>
        </View>

      </ExtraContainer>
    </Container>
  );
}

Game.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  commentNumber: PropTypes.number,
  clubsInGame: PropTypes.number,
};

export default Game;
