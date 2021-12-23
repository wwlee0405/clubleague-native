import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  height: 60px;
  background-color: ${colors.white};
  flex-direction: row;
  elevation: 4;
`;
const GoBack = styled.TouchableOpacity`
  margin-left: 15px;
  margin-top: 20px;
  width: 70px;
`;
const Username = styled.Text`
  font-size: 20px;
  margin-top: 15px;
  color: ${colors.black};
  font-weight: bold;
`;

function ScrollFeedHeader({ onPress, username }) {
  return (
    <Container>
      <GoBack onPress={onPress}>
        <MaterialCommunityIcons name="arrow-left" size={25} />
      </GoBack>
      <Username>{username}</Username>
    </Container>
  );
};

export default ScrollFeedHeader;
