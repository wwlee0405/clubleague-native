import React, { useState } from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import styled from "styled-components"
import { colors } from "../colors";

const Container = styled.View`
  height: 60px;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  elevation: 3;
`;
const LeftWrap = styled.View`
  flex-direction: row;
`;
const GoBack = styled.TouchableOpacity`
  justify-content: center;
  margin-left: 15px;
  width: 70px;
`;
const Username = styled.Text`
  font-size: 20px;
  margin-top: 12px;
  align-items: center;
  color: ${colors.black};
  font-weight: bold;
`;
const Acteion = styled.TouchableOpacity`
  justify-content: center;
  margin-right: 25px;
`;

function ScrollHeader({ onPress, username, iconName }) {
  return (
    <Container>
      <LeftWrap>
        <GoBack onPress={onPress}>
          <FontAwesome5 name="angle-left" size={25} />
        </GoBack>
        <Username>{username}</Username>
      </LeftWrap>
      <Acteion onPress={onPress}>
        <FontAwesome5 name={iconName} color="#2e8b57" size={25} />
      </Acteion>
    </Container>
  );
};

export default ScrollHeader;
