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
import HomeAway from "./HomeAway";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;
const ExtraContainer = styled.View`
  padding-bottom: 10px;
`;

const Dates = styled.View`
  padding-top: 10px;
  align-items: center;
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

const GameContent = styled.View`
  margin: 0px 15px 0px;
  flex-direction: row;
`;
const ClubData = styled.View`
  margin-bottom: 15px;
  align-items: center;
  width: 35%;
`;
const ClubEmblem = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const ClubName = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const KickOffData = styled.View`
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.Text`
  color: ${colors.yellow};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const Location = styled.Text`
  color: ${colors.darkGrey};
  font-size: 10px;
  text-align: center;
  overflow: hidden;
`;

const Entry = styled.Pressable`
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-horizontal: 15px;
`;
const EntryText = styled.Text`
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;
const UserAvatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

function Game({ id, user, games, clubNumInMatch, clubId, caption, commentNumber,
  homeClubName,
  awayClubName,


}) {
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  console.log(games);
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
        </Dates>

        <GameContent>
          <ClubData>
            <ClubEmblem source={require('../../data/2bar.jpg')} />
            <ClubName>{homeClubName}</ClubName>
          </ClubData>
          <KickOffData>
            <KickOffTime>10:00</KickOffTime>
            <Location numberOfLines={1}>Santiago Bernabéu dkndkfnbkdfnbkfjdnb</Location>
          </KickOffData>
          <ClubData>
            <ClubEmblem source={require('../../data/1ars.jpg')} />
            {clubsInGame === 2 ?
              <ClubName>{awayClubName}hvbhjvhvhgvhgvgvvgvgvgvgv</ClubName>
              :
              <ClubName>없음</ClubName>
            }
          </ClubData>
        </GameContent>

        <View style={{ alignItems: "center" }}>
          <TimeLocationWrap>
            <Feather name="clock" size={15} color={colors.darkGrey} />
            <TimeLocation>14:00 - 16:00</TimeLocation>
          </TimeLocationWrap>
          <TimeLocationWrap>
            <Feather name="map-pin" size={15} color={colors.darkGrey} />
            <TimeLocation>Camp Nou</TimeLocation>
          </TimeLocationWrap>
        </View>

        <Text>{clubNumInMatch}</Text>

        <Image source={require('../../data/bbbb.jpg')} style={{ height: 500, width: 300 }} />

        <BodyTextWrap>
          <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
        </BodyTextWrap>

        <Entry onPress={() => navigation.navigate("Entry", {
          gameId: games[0].id,
        })}>
          <EntryText>{null === 1 ? "1 entry" : `${null} entries`}</EntryText>
          <View style={{ paddingRight: 3 }}>
            <UserAvatar source={require('../../data/ffff.jpg')} />
          </View>
          <View style={{ paddingRight: 3 }}>
            <UserAvatar source={require('../../data/gggg.jpg')} />
          </View>
        </Entry>




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
  clubNumInMatch: PropTypes.number,
};

export default Game;
