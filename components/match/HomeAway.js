import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";
import styled from "styled-components/native";

const Container = styled.View``;
const RequestingMatch = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 15px;
`;
const ClubData = styled.View`
  flex-direction: row;
  width: 260px;
  height: 50px;
`;
const Emblem = styled.Image`
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
const UserAvatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;

function HomeAway({ onPress, clubname, entry }) {
  return (
    <Container>
      <RequestingMatch>
        <TouchableOpacity onPress={onPress}>
          <ClubData>
            <Emblem source={require('../../data/2bar.jpg')} />
            <Label>
              <LabelText>Home</LabelText>
              <ClubnameText numberOfLines={1}>{clubname}</ClubnameText>
            </Label>
          </ClubData>
        </TouchableOpacity>

        <TouchableOpacity onPress={null}>
          <AttendBtn>
            <BtnText>참석</BtnText>
          </AttendBtn>
        </TouchableOpacity>
      </RequestingMatch>

      <Pressable onPress={null}>
        <Entry>
          <EntryText><Text>{entry}</Text> Entry</EntryText>
          <View style={{ paddingRight: 3 }}>
            <UserAvatar source={require('../../data/ffff.jpg')} />
          </View>
          <View style={{ paddingRight: 3 }}>
            <UserAvatar source={require('../../data/gggg.jpg')} />
          </View>
        </Entry>
      </Pressable>
    </Container>
  );
}

HomeAway.propTypes = {
  clubname: PropTypes.string.isRequired,
  entry: PropTypes.string,
};

export default HomeAway;
