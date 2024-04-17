import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { View, Text, Modal, Pressable, TouchableOpacity, Image, Alert, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme";

const Container = styled.View`
  flex: 1;
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
  font-weight: bold;
  font-size: 35px;
`;
const MatchWeek = styled.Text`
  font-weight: 600;
  font-size: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const GameContent = styled.View`
  margin: 0px 15px 0px;
  flex-direction: row;
`;
const ClubData = styled.Pressable`
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
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const KickOffData = styled.View`
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.Text`
  color: ${commonTheme.yellow};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const Location = styled.Text`
  font-size: 10px;
  text-align: center;
  overflow: hidden;
`;
const EnteryText = styled.Text`
  margin-left: 15px;
`;

function OutcluberItem({ club, outcluberNumber }) {
  const { colors } = useTheme();
  
  return (
    <Container style={{backgroundColor: colors.cardHeader}}>

      <ExtraContainer style={{backgroundColor: colors.cardContent}}>
        <Dates>
          <MatchDate style={{color: colors.text}}>APR 23</MatchDate>
          <MatchWeek style={{color: colors.text}}>Saturday</MatchWeek>
        </Dates>

        <GameContent>
          <ClubData>
            <ClubEmblem source={require('../../data/2bar.jpg')} />
            <ClubName style={{color: colors.text}}>{club?.clubname}</ClubName>
          </ClubData>
          <KickOffData>
            <KickOffTime>10:00</KickOffTime>
            <Location numberOfLines={1} style={{color: colors.subText}}>Santiago Bernabéu dkndkfnbkdfnbkfjdnb</Location>
          </KickOffData>
        </GameContent>
          
        <EnteryText style={{color: colors.text}}>{outcluberNumber === 1 ? "1 outcluber" : `${outcluberNumber} outclubers`}</EnteryText>

      </ExtraContainer>
    </Container>
  );
}
  
OutcluberItem.propTypes = {
  club: PropTypes.shape({
    clubname: PropTypes.string,
  }),
  outcluberNumber: PropTypes.number,
};
  
export default OutcluberItem;
  