import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  margin: 3px;
  border-radius: 15px;
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
	font-size: 14px;
`;

function SelectClubItem({ onPress, clubId, club, clubname, emblem }) {
  const { colors } = useTheme();
  return (
    <Container 
      onPress={onPress}
      style={{backgroundColor: colors.background}}
    >
      <Column>
        {emblem ? (
          <Emblem source={{ uri: emblem }} />
        ) : (
          <Emblem source={require('../../data/2bar.jpg')} />
        )}
        <Data>
          <ClubName style={{color: colors.text}}>{clubname}</ClubName>
          <ClubArea style={{color: colors.subText}}>Madrid, Spain</ClubArea>
        </Data>
      </Column>
    </Container>
  );
}

SelectClubItem.propTypes = {
  id: PropTypes.number,
  club: PropTypes.shape({
    clubId: PropTypes.number,
    id: PropTypes.number,
    clubname: PropTypes.string,
    emblem: PropTypes.string,
  }),
};

export default SelectClubItem;
