import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme.js";
import { View } from "react-native";
import HeaderAvatar from "../HeaderAvatar.js";
import Button from "../Button.js";

const Container = styled.View`
  border-radius: 15px;
  margin: 5px;
  elevation: 2;
  border: 1px solid black;
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
  font-size: 15px;
  font-weight: bold;
  padding: 0px 15px 20px;
`;
const MatchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 15px;
`;
const HomeAway = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ClubEmblem = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const ClubName = styled.Text`
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
`;
const OutcluberText = styled.Text`
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

function OutcluberFeedItem({ club, home, away }) {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  return(
    <Container style={{ backgroundColor: colors.cardHeader }}>
      <HeaderAvatar
        onPress={goToProfile}
        modalVisible={() => setModalVisible(true)}
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
            <Sports style={{ color: colors.text }}>Soccer</Sports>
          </View>
        </Row>
        <MatchContent>
          {club.id === home.homeGame.club.id ? (
            <HomeAway>
              <ClubEmblem source={require('../../data/1ars.jpg')} />
              <ClubName style={{ color: colors.text }}>{home.homeGame.club.clubname}</ClubName>
            </HomeAway>
          ) : (
            <HomeAway>
              <ClubEmblem source={require('../../data/1ars.jpg')} />
              <ClubName style={{ color: colors.text }}>{home.awayGame.club.clubname}</ClubName>
            </HomeAway>
          )}
          
          <Button
            onPress={null}
            buttonColor={buttonColor}
            textColor={textColor}
            text={"Entry"}
          />
        </MatchContent>

        <OutcluberText style={{ color: colors.subText }}>1/5 outcluber</OutcluberText>
        <TimeLocationContent>
          <TimeText style={{ color: colors.symbolColor }}>10:00-14:00</TimeText>
          <Location style={{ color: colors.subText }}>Santiago Bernabéu</Location>
        </TimeLocationContent>
      </ExtraContainer>
    </Container>
  );
}

OutcluberFeedItem.propTypes = {
  club: PropTypes.shape({
    id: PropTypes.number,
  }),
  home: PropTypes.shape({
    homeGame: PropTypes.shape({
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
};

export default OutcluberFeedItem;