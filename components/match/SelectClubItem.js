import React from "react";
import PropTypes from "prop-types";
import { colors } from "../../colors";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  margin: 3px;
  border-radius: 15px;
  background-color: ${colors.white};
  elevation: 1;
  width: 100%;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Emblem = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;
const Data = styled.View``;
const ClubName = styled.Text`
	font-weight: bold;
`;
const ClubArea = styled.Text`
	color: ${colors.darkGrey};
	font-size: 14px;
`;

function SelectClubItem({ onPress, club, clubname }) {
  return (
    <Container onPress={onPress}>
      <Column>
        <Emblem source={require('../../data/aaaa.jpg')} />
        <Data>
          <ClubName>{club.clubname}</ClubName>
          <ClubArea>Madrid, Spain</ClubArea>
        </Data>
      </Column>
    </Container>
  );
}

SelectClubItem.propTypes = {
  userMember: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        clubname: PropTypes.string.isRequired,
      }),
    }),
  ),
};

export default SelectClubItem;
