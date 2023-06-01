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
  padding-bottom: 8px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${colors.grey01};
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
const MatchEmblem = styled.Image`
  margin-right: -10px;
  width: 40px;
  height: 40px;
  border-color: ${colors.grey01};
  border-width: 3px;
  border-radius: 20px;
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

function MySchedItem({ id, club, entryNumber, isEntry }) {
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
      <HeaderAvatar
        image={club?.emblem}
        topData={club?.clubname}
        bottomData="Seoul, Korea"
      />
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
            <HomeAway>
              <MatchEmblem source={require('../../data/1ars.jpg')} />
              <MatchEmblem source={require('../../data/2bar.jpg')} />
            </HomeAway>
          </MatchData>

          <Button
            onPress={toggleEntry}
            buttonColor={isEntry ? { main : colors.grey03 } : buttonColor}
            textColor={isEntry ? { main : colors.black } : textColor}
            text={isEntry ? "Unentry" : "Entry"}
          />

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

MySchedItem.propTypes = {
  id: PropTypes.number.isRequired,
  club: PropTypes.shape({
    clubname: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    id: PropTypes.number,
  }),
  entryNumber: PropTypes.number,
  isEntry: PropTypes.bool,
};

export default MySchedItem;
