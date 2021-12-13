import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const View = styled.View``;
const Text = styled.Text``;
const Container = styled.View`
  width: 100%;
`;
const Header = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const UserData = styled.View`
  flex-direction: row;
`;
const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;
const Clubname = styled.Text`
  color: ${colors.darkGrey};
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;
const Sports = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;
const ClubData = styled.View`
  flex-direction: row;
`;
const ClubEmblem = styled.Image`
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const Date = styled.Text`
  color: ${colors.black};
  font-size: 25px;
  font-weight: 600;
`;
const Time = styled.Text`
  color: ${colors.lightGrey};
`;
const Location = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;

function MatchItem({ id }) {
  return (
    <Container>
      <Header>
        <UserAvatar source={require('../../data/2bar.jpg')} />
        <UserData>
          <Username>karina</Username>
          <Clubname>aespa</Clubname>
        </UserData>
      </Header>
      <ExtraContainer>
        <Sports>Soccer</Sports>
        <ClubData>
          <ClubEmblem source={require('../../data/2bar.jpg')} />
        </ClubData>
        <Date>Jul 20 Sun</Date>
        <Time>10:00-14:00</Time>
        <Location>London</Location>
      </ExtraContainer>
    </Container>
  );
}

MatchItem.propTypes = {
  id: PropTypes.number,
};

export default MatchItem;
