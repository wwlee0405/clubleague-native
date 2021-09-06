import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View``;
const Touchable = styled.View``;
const ClubTeam = styled.View`
  align-items: center;
`;
const ClubName = styled.Text`
  font-weight: bold;
  width: 80px;
  overflow: hidden;
`;

function MyClub({id, clubname}) {
  return (
    <Container>
      <Touchable>
        <ClubTeam>
          <ClubName numberOfLines={1}>{id}</ClubName>
        </ClubTeam>
      </Touchable>
    </Container>
  );
}

MyClub.propTypes = {
  id: PropTypes.number.isRequired,
  clubname: PropTypes.string.isRequired,
};

export default MyClub;
