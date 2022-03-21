import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { colors } from "../../colors";

const View = styled.View``;
const Container = styled.View`
  flex: 1;
  flex-direction: row;
  border-radius: 15px;
  background-color: ${colors.white};
  margin: 5px;
  padding-vertical: 10px;
  elevation: 1;
`;
const Emblem = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: 30px;
`;
const ClubEmblem = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;
const ClubName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const RowContainer = styled.View`
  flex-direction: row;
`;
const ClubArea = styled.Text`
  font-size: 12px;
  margin-top: -3px;
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

function SearchedClub({
  clubname,
  clubArea,
  sports,
  clubInfo,
  totalMember,
  clubLeader,
}) {
  return (
    <Container>
      <Emblem>
        <ClubEmblem source={require('../../data/1ars.jpg')} />
      </Emblem>
      <View>
        <View>
          <ClubName>{clubname}</ClubName>
        </View>
        <View>
          <ClubArea>{clubArea}</ClubArea>
        </View>
        <RowContainer>
          <Text>sports</Text>
          <PaddingText>clubInfo</PaddingText>
        </RowContainer>
        <RowContainer>
          <Text>{totalMember} Members</Text>
          <PaddingText>Leader {clubLeader.username}</PaddingText>
        </RowContainer>
      </View>
    </Container>
  );
}

SearchedClub.propTypes = {
  id: PropTypes.number.isRequired,
  clubname: PropTypes.string.isRequired,
  clubArea: PropTypes.string,
  sports: PropTypes.string,
  totalMember: PropTypes.number.isRequired,
  clubLeader: PropTypes.shape({
    username: PropTypes.string,
  }),
};

export default SearchedClub;
