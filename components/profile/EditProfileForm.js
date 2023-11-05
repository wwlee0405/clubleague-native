import React from "react";
import PropTypes from "prop-types";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";

const Container = styled.View`
  background-color: ${commonTheme.white};
  padding: 30px 20px;
`;
const AvatarWrap = styled.View`
  align-items: center;
  padding-bottom: 40px;
`;
const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;
const ProfileWrap = styled.Pressable`
  border-bottom-color: ${commonTheme.darkGrey};
  border-bottom-width: 0.5px;
  padding-bottom: 5px;
  margin-bottom: 15px;
`;
const NameTag = styled.Text`
  font-size: 11px;
  color: ${commonTheme.darkGrey};
`;
const Property = styled.Text`
  font-size: 15px;
  color: ${commonTheme.black};
`;

function EditProfileForm({ 
  avatar, 
  username, 
  fullName,
  email,
  bio,
}) {
  const navigation = useNavigation();
  return (
    <Container>
      <AvatarWrap>
        <Pressable onPress={() => navigation.navigate("UploadAvatar")}>
          {avatar ? (
            <Avatar source={{ uri: avatar }} />
          ) : (
            <Avatar source={require('../../data/dddd.jpg')} />
          )}
        </Pressable>
      </AvatarWrap>

      <ProfileWrap onPress={() => navigation.navigate("EditUsername")}>
        <NameTag>Username</NameTag>
        <Property>{username}</Property>
      </ProfileWrap>
      <ProfileWrap onPress={() => navigation.navigate("EditName")}>
        <NameTag>Name</NameTag>
        <Property>{fullName}</Property>
      </ProfileWrap>
      <ProfileWrap>
        <NameTag>Area</NameTag>
        <Property>Barcelona, Spain</Property>
      </ProfileWrap>
      <ProfileWrap>
        <NameTag>Email</NameTag>
        <Property>{email}</Property>
      </ProfileWrap>
      <ProfileWrap onPress={() => navigation.navigate("EditBio")}>
        <NameTag>bio</NameTag>
        <Property>{bio}</Property>
      </ProfileWrap>
      
    </Container>
  );
}

EditProfileForm.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string,
  fullName: PropTypes.string,
};

export default EditProfileForm;
