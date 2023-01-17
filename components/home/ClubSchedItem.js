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
const MatchEmblem = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-color: ${colors.grey03};
  border-width: 1px;
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
function ClubSchedItem({ }) {
  const navigation = useNavigation();

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
            <HomeAway>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "grey"}}>VS</Text>
              <MatchEmblem source={require('../../data/2bar.jpg')} />
              <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: -10}}>barcelona</Text>
            </HomeAway>
          </MatchData>

          <Button
            onPress={null}
            buttonColor={buttonColor}
            textColor={textColor}
            text="Unentry"
          />

        </MatchContent>
        <EnteryText>1 entry</EnteryText>
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
  club: PropTypes.shape({
    clubname: PropTypes.string,
  }),
  match: PropTypes.shape({
    id: PropTypes.number,
  }),
  entryNumber: PropTypes.number,
  isEntry: PropTypes.bool,
};

export default ClubSchedItem;
