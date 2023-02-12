import { gql, useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { RefreshControl, View, Text, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import HeaderAvatar from "../../components/HeaderAvatar.js";
import Game from "../../components/match/Game";
import { GAME_FRAGMENT } from "../../fragments";

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
const TimeLocationWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TimeLocation = styled.Text`
  color: ${colors.darkGrey};
  padding-left: 3px;
`;
const Entry = styled.Pressable`
  flex-direction: row;
  padding: 5px 15px 5px;
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
  position: absolute;
  bottom: 0;
  height: 80px;
  width: 100%;
  align-items: center;
  border-top: 1px solid ${colors.emerald};
  padding: 10px 15px;
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
        ...GameFragment
        entryNumber
        isEntry
      }
      commentNumber
      clubsInGame
    }
  }
  ${GAME_FRAGMENT}
`;

export default function GameMatch({ route }) {
  const navigation = useNavigation();
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
  return (
    <ScreenLayout loading={loading}>
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

            </Dates>

            <GameContent>
              <ClubData>
                <ClubEmblem source={require('../../data/2bar.jpg')} />
                <ClubName>{data?.seeGame?.games[0].club?.clubname}</ClubName>
              </ClubData>
              <KickOffData>
                <KickOffTime>10:00</KickOffTime>
                <Location numberOfLines={1}>Santiago Bernabéu dkndkfnbkdfnbkfjdnb</Location>
              </KickOffData>
                {data?.seeGame?.clubsInGame === 2 ?
                  <ClubData>
                    <ClubEmblem source={require('../../data/1ars.jpg')} />
                    <ClubName>{data?.seeGame?.games[1].club?.clubname}hvbhjvhvhgvhgvgvvgvgvgvgv</ClubName>
                  </ClubData>
                  :
                  <ClubData>
                    <AwayText>Away</AwayText>
                  </ClubData>
                }
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

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Entry onPress={() => navigation.navigate("Entry", {
                gameId: data?.seeGame?.games[0].id,
              })}>
                <EntryText>{data?.seeGame?.games[0].entryNumber === 1 ? "1 entry" : `${data?.seeGame?.games[0].entryNumber} entries`}</EntryText>
                <View style={{ paddingRight: 3 }}>
                  <UserAvatar source={require('../../data/ffff.jpg')} />
                </View>
                <View style={{ paddingRight: 3 }}>
                  <UserAvatar source={require('../../data/gggg.jpg')} />
                </View>
              </Entry>
              {data?.seeGame?.clubsInGame === 2 ?
                <Entry onPress={() => navigation.navigate("Entry", {
                  gameId: data?.seeGame?.games[1].id,
                })}>
                  <EntryText>{data?.seeGame?.games[1].entryNumber === 1 ? "1 entry" : `${data?.seeGame?.games[1].entryNumber} entries`}</EntryText>
                  <View style={{ paddingRight: 3 }}>
                    <UserAvatar source={require('../../data/ffff.jpg')} />
                  </View>
                  <View style={{ paddingRight: 3 }}>
                    <UserAvatar source={require('../../data/gggg.jpg')} />
                  </View>
                </Entry>
                :
                <Entry>
                  <EntryText>no awayclub</EntryText>
                </Entry>
              }
            </View>

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
    </ScreenLayout>
  )
}
