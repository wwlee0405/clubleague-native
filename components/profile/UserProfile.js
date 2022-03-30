import React from "react";
import PropTypes from "prop-types";
import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  padding: 10px;
  background-color: ${colors.white};
`;
const ProfileWrap = styled.View`
  flex-direction: row;
  margin-top: 30px;
`;
const AvatarWrap = styled.View`
  flex: 1;
  align-items: center;
`;
const ProfileInfoWrap = styled.View`
  flex: 1;
  justify-content: center;
  padding-left: 20px;
`;
const NameTag = styled.Text`
  font-size: 10px;
  color: ${colors.darkGrey};
`;
const Property = styled.Text`
  font-size: 15px;
  color: ${colors.black};
`;
const EditProfileBtn = styled.View`
  margin-top: 20px;
  margin-horizontal: 20px;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-width: 1px;
  border-color: ${colors.emerald};
  background-color: ${colors.white};
  border-radius: 8px;
`;
const EditProfileBtnText = styled.Text`
  font-weight: 600;
  color: ${colors.emerald};
`;

function UserProfile({ onPress, username, firstName, lastName }) {
  const navigation = useNavigation();
  return (
    <Container>
      <ProfileWrap>
        <AvatarWrap>
          <TouchableOpacity onPress={() => null}>
            <Image
              source={require('../../data/dddd.jpg')}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          </TouchableOpacity>
        </AvatarWrap>
        <ProfileInfoWrap>
          <View>
            <NameTag>Username</NameTag>
            <Property>{username}</Property>
          </View>
          <View>
            <NameTag>Name</NameTag>
            <Property>{firstName} {lastName}</Property>
          </View>
          <View>
            <NameTag>Area</NameTag>
            <Property>Barcelona, Spain</Property>
          </View>
        </ProfileInfoWrap>
      </ProfileWrap>

      <TouchableOpacity onPress={null}>
        <EditProfileBtn>
          <EditProfileBtnText>Edit Profile</EditProfileBtnText>
        </EditProfileBtn>
      </TouchableOpacity>
    </Container>
  );
}

UserProfile.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default UserProfile;
