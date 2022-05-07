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
import HomeAway from "./HomeAway";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;
const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
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

function Game({ id, user, clubsInGame, games, route, clubId }) {
  const navigation = useNavigation();
  const renderItem = ({ item: matching }) => (
    <HomeAway {...matching.club} />
  );
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar resizeMode="cover" source={require('../../data/eeee.png')} />
        <Username>{user?.username}</Username>
      </Header>
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

        <View style={{ backgroundColor: colors.greyColor }}>
          <FlatList
            data={games}
            keyExtractor={(matching) => "" + matching.club.clubname}
            renderItem={renderItem}
          />
        </View>

        <View style={{ alignItems: 'center', paddingTop: 10 }}>
          <JoinGame onPress={() => navigation.navigate("SelectAway")}>
            <BtnText>Join Game</BtnText>
          </JoinGame>
        </View>

        <Text>file</Text>
        <BodyTextWrap>
          <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
        </BodyTextWrap>

      </ExtraContainer>
    </Container>
  );
}

Game.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  clubsInGame: PropTypes.number,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      joinedGame: PropTypes.bool,
      club: PropTypes.shape({
        clubname: PropTypes.string.isRequired,
      }),
    }),
  ),

};

export default Game;
