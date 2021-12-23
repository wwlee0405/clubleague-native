import React, { useState } from "react";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useNavigation } from "@react-navigation/native";

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
const InputBox = styled.TouchableOpacity`
  flex-direction: row;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  margin-left: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 7px;
  align-items: center;
  width: 70%;
`;
const Text = styled.Text`
  margin-left: 15px;
`;

function ScrollMatchHeader({ onPress, username, iconName }) {
  const navigation = useNavigation();
  const goToRoom = () =>
    navigation.navigate("SearchClub");
  return (
    <Container>
      <InputBox onPress={goToRoom}>
        <Ionicons name="search" size={25} />
        <Text>search</Text>
      </InputBox>
      <Acteion onPress={onPress}>
        <FontAwesome5 name={iconName} color="#2e8b57" size={25} />
      </Acteion>
    </Container>
  );
};

export default ScrollMatchHeader;
