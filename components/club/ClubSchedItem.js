import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { View } from "react-native";
import Button from "../Button.js";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme";

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
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
`;
const MatchEmblem = styled.Image`
  margin-right: 10px;
  width: 34px;
  height: 34px;
  border-width: 1px;
  border-radius: 17px;
`;
const ClubName = styled.Text`
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
  font-size: 25px;
  font-weight: bold;
`;
const Location = styled.Text`
  font-weight: 600;
`;
const buttonColor = {
  main: commonTheme.blue
};
const textColor = {
  main: commonTheme.white
};
function ClubSchedItem({
  id,
  club,
  home,
  away,
  isEntry,
  entryNumber
}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
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
    <Container style={{backgroundColor: colors.cardContent}}>
      <ExtraContainer>
        <Row>
          <DateContent>
            <DateText style={{color: colors.text}}>23</DateText>
            <View style={{ paddingLeft: 10 }}>
              <WeekText style={{color: colors.text}}>SUNDAY</WeekText>
              <MonthText style={{color: colors.subText}}>OCT</MonthText>
            </View>
          </DateContent>
          <View>
            <Sports style={{color: colors.text}}>Soccer Match</Sports>
          </View>
        </Row>
        <MatchContent>
          <MatchData>
            {club.id === home.homeGame?.club.id ? (
              <HomeAway>
                <VersusText style={{color: colors.subText}}>VS</VersusText>
                <MatchEmblem source={require('../../data/2bar.jpg')} />
                <ClubName style={{color: colors.text}}>{away.homeGame?.club.clubname}1</ClubName>
              </HomeAway>
            ) : (
              <HomeAway>
                <VersusText>VS</VersusText>
                <MatchEmblem source={require('../../data/2bar.jpg')} />
                <ClubName style={{color: colors.text}}>{away.awayGame?.club.clubname}Not Yet</ClubName>
              </HomeAway>
            )}
            
          </MatchData>

          {club.isJoined ? (
            <Button
              onPress={toggleEntry}
              buttonColor={isEntry ? { main : commonTheme.grey03 } : buttonColor}
              textColor={isEntry ? { main : commonTheme.black } : textColor}
              text={isEntry ? "Unentry" : "Entry"}
            />
          ) : null}

        </MatchContent>
        <EnteryText>{entryNumber === 1 ? "1 entry" : `${entryNumber} entries`}</EnteryText>
        <TimeLocationContent>
          <TimeText style={{color: colors.symbolColor}}>10:00-14:00</TimeText>
          <Location style={{color: colors.subText}}>Santiago Bernabéu</Location>
        </TimeLocationContent>
      </ExtraContainer>
    </Container>
  );
}

ClubSchedItem.propTypes = {
  club: PropTypes.shape({
    id: PropTypes.number,
    isJoined: PropTypes.bool,
  }),
  home: PropTypes.shape({
    homeGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
    awayGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
  }),
  away: PropTypes.shape({
    awayGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
  }),
  entryNumber: PropTypes.number,
  isEntry: PropTypes.bool,
};

export default ClubSchedItem;
