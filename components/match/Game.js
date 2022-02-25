import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";
import HomeAway from "./HomeAway";

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
  padding-bottom: 10px;
`;
const BodyTextWrap = styled.View`
  padding-top: 10px;
  padding-horizontal: 15px;
`;

function Game({ id, user }) {
  const navigation = useNavigation();
  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar resizeMode="cover" source={require('../../data/eeee.png')} />
        <Username>{id}</Username>
      </Header>
      <ExtraContainer>

        <Text>file</Text>
        <BodyTextWrap>
          <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
        </BodyTextWrap>

        <View style={{ backgroundColor: colors.greyColor }}>
          <HomeAway clubname={"Barcelona"} entry={"12"} />
          <HomeAway clubname={"Arsnal"} entry={"13"} />
          <HomeAway clubname={"Austin"} entry={"15"} />
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
