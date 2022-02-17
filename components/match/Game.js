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
  padding-bottom: 10px;
`;

const BodyTextWrap = styled.View`
  padding-top: 10px;
  padding-horizontal: 15px;
`;
const ClubInfoWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 15px;
`;
const ClubData = styled.View`
  flex-direction: row;
  width: 260px;
  height: 50px;
`;
const ClubEmblem = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
`;
const Label = styled.View`
  padding-left: 10px;
  width: 200px;
`;
const LabelText = styled.Text`
  font-size: 10px;
  color: ${colors.darkGrey};
`;
const ClubnameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const AttendBtn = styled.View`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;
const BtnText = styled.Text`
  color: ${colors.white};
  align-items: center;
`;
const Entry = styled.View`
  flex-direction: row;
  padding-top: 5px;
  padding-horizontal: 15px;
`;
const EntryText = styled.Text`
  justify-content: center;
  align-items: center;
  padding-right: 10px;
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
        <BodyTextWrap>
          <Text>캄푸누에서 뛸 매치 상대를 구합니다.</Text>
        </BodyTextWrap>

        <View style={{ backgroundColor: colors.greyColor }}>

          <ClubInfoWrap>
            <TouchableOpacity onPress={null}>
              <ClubData>
                <TouchableOpacity onPress={null}>
                 <ClubEmblem source={require('../../data/2bar.jpg')} />
                </TouchableOpacity>
                <Label>
                  <LabelText>Home</LabelText>
                  <ClubnameText numberOfLines={1}>Barcelona</ClubnameText>
                </Label>
              </ClubData>
            </TouchableOpacity>

            <TouchableOpacity onPress={null}>
              <AttendBtn>
                <BtnText>참석</BtnText>
              </AttendBtn>
            </TouchableOpacity>
          </ClubInfoWrap>

          <TouchableOpacity onPress={null}>
            <Entry>
              <EntryText><Text>12</Text> Entry</EntryText>
              <View style={{ paddingRight: 3 }}>
                <Image
                  source={require('../../data/ffff.jpg')}
                  style={{ width: 25, height: 25, borderRadius: 12.5 }}
                />
              </View>
              <View style={{ paddingRight: 3 }}>
                <Image
                  source={require('../../data/gggg.jpg')}
                  style={{ width: 25, height: 25, borderRadius: 12.5 }}
                />
              </View>
            </Entry>
          </TouchableOpacity>
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
