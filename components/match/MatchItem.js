import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import HeaderAvatar from "../HeaderAvatar.js";
import { View } from "react-native";

const Container = styled.View`
  border-radius: 15px;
  margin: 5px;
  elevation: 2;
`;
const ExtraContainer = styled.View`
  padding-bottom: 8px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 25px;
`;
const DateContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DateText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
const WeekText = styled.Text`
  font-weight: bold;
`;
const MonthText = styled.Text`
  margin-top: -8px;
`;
const Sports = styled.Text`
  font-size: 15px;
  font-weight: bold;
  padding: 0px 15px 20px;
`;
const GameContent = styled.View`
  margin: 0px 15px 15px;
  flex-direction: row;
  justify-content: space-evenly;
`;
const ClubEmblem = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const KickOffData = styled.View`
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const Location = styled.Text`
  font-size: 10px;
  text-align: center;
  width: 100%;
  overflow: hidden;
`;
const AwayText = styled.Text`
  font-weight: 600;
  font-size: 25px;
`;
const VersusText = styled.Text`
  font-size: 15px;
  text-align: center;
`;
const ClubName = styled.Text`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
`;

function MatchItem({ user, homeGame, awayGame }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  const homeClubname = homeGame.club.clubname;
  const homeEmblem = homeGame.club.emblem;
  const awayClubname = awayGame?.club.clubname;
  const awayEmblem = awayGame?.club.emblem;
  return (
    <Container style={{ backgroundColor: colors.cardHeader }}>
      <HeaderAvatar
        onPress={goToProfile}
        image={user.avatar}
        topData={user.username}
        bottomData={homeClubname}
      />
      <ExtraContainer style={{ backgroundColor: colors.cardContent }}>

        <Row>
          <DateContent>
            <DateText style={{ color: colors.text }}>23</DateText>
            <View style={{ paddingLeft: 10 }}>
              <WeekText style={{ color: colors.text }}>SUNDAY</WeekText>
              <MonthText style={{ color: colors.subText }}>OCT</MonthText>
            </View>
          </DateContent>
          <View>
            <Sports style={{ color: colors.text }}>Soccer Match</Sports>
          </View>
        </Row>

        <GameContent>
          {homeEmblem ?
            <ClubEmblem source={{ uri: homeEmblem }} />
            :
            <ClubEmblem source={require('../../data/1ars.jpg')} />
          }
          <KickOffData>
            <KickOffTime style={{ color: colors.yellow }}>10:00</KickOffTime>
            <Location 
              numberOfLines={1}
              style={{ color: colors.subText }}
            >
              Santiago Bernabéu
            </Location>
          </KickOffData>

          {awayClubname ? (
            <View>
              {awayEmblem ? (
                <ClubEmblem source={{ uri: awayEmblem }} />
              ) : (
                <ClubEmblem source={require('../../data/2bar.jpg')} />
              )}
            </View>
          ) : (
            <AwayText style={{ color: colors.subText }}>Away</AwayText>
          )}
        </GameContent>
        <VersusText style={{ color: colors.subText }}>
          <ClubName style={{ color: colors.text }}>{homeClubname} </ClubName>
          V
          {awayClubname ?
            <ClubName style={{ color: colors.text }}> {awayClubname}</ClubName>
            :
            <ClubName style={{ color: colors.text }}> 없음</ClubName>
          }
        </VersusText>
      </ExtraContainer>
    </Container>
  );
}

MatchItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  homeGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
  awayGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
};

export default MatchItem;
