import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;
const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;


function Game({ id, user }) {
  const navigation = useNavigation();
  return (
    <Container>
      <Header>
        <UserAvatar resizeMode="cover" source={require('../../data/eeee.png')} />
        <Username>{id}</Username>
      </Header>
      <ExtraContainer>

        <Text>file</Text>
        <View style={{ backgroundColor: colors.lightGrey }}>
          <Text>Game</Text>
        </View>

      </ExtraContainer>
    </Container>
  );
}

Game.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),

};
export default Game;
