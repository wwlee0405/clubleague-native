import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: 20px;
  background-color: ${colors.white};
  margin-vertical: 5px;
  padding-vertical: 8px;
  elevation: 3;
`;
const Emblem = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 30px;
`;
const ClubEmblem = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 100px;
`;
const ExtraContainer = styled.View`
  flex: 1;
  padding: 5px 10px 5px 50px;
`;
const ClubName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const ClubInfoContainer = styled.View`
  flex-direction: row;
`;
const ClubArea = styled.Text`
  font-size: 12px;
`;
const Text = styled.Text`
  font-size: 12px;
  color: ${colors.darkGrey};
`;
const PaddingText = styled.Text`
  font-size: 12px;
  padding-left: 20px;
  color: ${colors.darkGrey};
`;

function SearchedClub({ clubname, clubInfo, sports, clubArea, totalMember, clubLeader, username }) {
  return (
    <Container>
      <Emblem>
        <ClubEmblem source={require('../../data/1ars.jpg')} />
      </Emblem>
      <ExtraContainer>
        <View>
          <ClubName>{clubname}</ClubName>
        </View>
        <View>
          <ClubArea>{clubArea}</ClubArea>
        </View>
        <ClubInfoContainer>
          <Text>sports</Text>
          <PaddingText>clubInfo</PaddingText>
        </ClubInfoContainer>
        <ClubInfoContainer>
          <Text><Text>{totalMember}</Text> Members</Text>
          <PaddingText>Leader <Text>{clubLeader.username}</Text></PaddingText>
        </ClubInfoContainer>
      </ExtraContainer>
    </Container>
  );
}

SearchedClub.propTypes = {
  id: PropTypes.number.isRequired,
  clubname: PropTypes.string.isRequired,
  clubArea: PropTypes.string,
  sports: PropTypes.string,
  totalMember: PropTypes.number,
  clubLeader: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default SearchedClub;
