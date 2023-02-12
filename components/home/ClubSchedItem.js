import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Text, View, Image } from "react-native";
import HeaderAvatar from "../HeaderAvatar.js";
import Button from "../Button.js";

const TOGGLE_ENTRY_MUTATION = gql`
  mutation toggleEntry($gameId: Int!) {
    toggleEntry(gameId: $gameId) {
      ok
      error
      id
    }
  }
`;

const Container = styled.View`
  border-radius: 15px;
  background-color: ${colors.white};
  margin: 5px;
  elevation: 2;
`;
const ExtraContainer = styled.View`
  padding: 0px 10px 8px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;
const DateContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DateText = styled.Text`
  color: ${colors.black};
  font-size: 30px;
  font-weight: bold;
`;
const WeekText = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;
const MonthText = styled.Text`
  color: ${colors.darkGrey};
  margin-top: -8px;
`;
const Sports = styled.Text`
  color: ${colors.black};
  font-weight: 600;
  font-size: 15px;
`;
const MatchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 15px;
`;
const MatchData = styled.View`
  align-items: center;
  justify-content: center;
`;
const HomeAway = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const VersusText = styled.Text`
  color: ${colors.darkGrey};
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
`;
const MatchEmblem = styled.Image`
  margin-right: 10px;
  width: 34px;
  height: 34px;
  border-color: ${colors.grey03};
  border-width: 1px;
  border-radius: 17px;
`;
const ClubName = styled.Text`
  color: ${colors.black};
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  margin-left: -5px;
`;
const EnteryText = styled.Text`
  margin-left: 15px;
`;
const TimeLocationContent = styled.View`
  align-items: center;
  justify-content: center;
`;
const TimeText = styled.Text`
  color: ${colors.seaGreen};
  font-size: 25px;
  font-weight: bold;
`;
const Location = styled.Text`
  color: ${colors.darkGrey};
  font-weight: 600;
`;
const buttonColor = {
  main: colors.blue
};
const textColor = {
  main: colors.white
};

function ClubSchedItem({
  clubsInGame,
  id,
  match,
  club,
  isEntry,
  entryNumber
}) {
  const navigation = useNavigation();
  const toggleEntryUpdate = (cache, result) => {
    const {
      data: {
        toggleEntry: { ok },
      },
    } = result;
    if (ok) {
      const gameId = `Game:${id}`;
      cache.modify({
        id: gameId,
        fields: {
          isEntry(prev) {
            return !prev;
          },
          entryNumber(prev) {
            if (isEntry) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleEntry] = useMutation(TOGGLE_ENTRY_MUTATION, {
    variables: {
      gameId: id,
    },
    update: toggleEntryUpdate,
  });
  return (
    <Container>
      <ExtraContainer>
        <Row>
          <DateContent>
            <DateText>23</DateText>
            <View style={{ paddingLeft: 10 }}>
              <WeekText>SUNDAY</WeekText>
              <MonthText>OCT</MonthText>
            </View>
          </DateContent>
          <View>
            <Sports>Soccer Match</Sports>
          </View>
        </Row>
        <MatchContent>
          <MatchData>
            {match.clubsInGame === 2 ? (
              id === match.games[0].id ? (
                <HomeAway>
                  <VersusText>VS</VersusText>
                  <MatchEmblem source={require('../../data/2bar.jpg')} />
                  <ClubName>{match.games[1].club.clubname}</ClubName>
                </HomeAway>
              ) : (
                <HomeAway>
                  <VersusText>VS</VersusText>
                  <MatchEmblem source={require('../../data/2bar.jpg')} />
                  <ClubName>{match.games[0].club.clubname}</ClubName>
                </HomeAway>
              )
            ) : (
              <HomeAway>
                <VersusText>VS</VersusText>
                <ClubName>waiting for the challenger</ClubName>
              </HomeAway>
            )}
          </MatchData>

          {club.isJoined ? (
            <Button
              onPress={toggleEntry}
              buttonColor={isEntry ? { main : colors.grey03 } : buttonColor}
              textColor={isEntry ? { main : colors.black } : textColor}
              text={isEntry ? "Unentry" : "Entry"}
            />
          ) : null}

        </MatchContent>
        <EnteryText>{entryNumber === 1 ? "1 entry" : `${entryNumber} entries`}</EnteryText>
        <TimeLocationContent>
          <TimeText>10:00-14:00</TimeText>
          <Location>Santiago Bernabéu</Location>
        </TimeLocationContent>
      </ExtraContainer>
    </Container>
  );
}

ClubSchedItem.propTypes = {
  id: PropTypes.number,
  match: PropTypes.shape({
    clubsInGame: PropTypes.number,
    games: PropTypes.arrayOf(
      PropTypes.shape({
        club: PropTypes.shape({
          clubname: PropTypes.string,
        }),
      }),
    ),
  }),
  club: PropTypes.shape({
    isJoined: PropTypes.bool,
  }),
  entryNumber: PropTypes.number,
  isEntry: PropTypes.bool,
};

export default ClubSchedItem;
