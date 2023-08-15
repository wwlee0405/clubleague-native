import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  background-color: ${colors.white};
  padding: 30px 20px;
`;
const ProfileWrap = styled.Pressable`
  border-bottom-color: ${colors.darkGrey};
  border-bottom-width: 0.5px;
  padding-bottom: 3px;
  margin-bottom: 12px;
`;
const NameTag = styled.Text`
  font-size: 10px;
  color: ${colors.darkGrey};
`;
const Property = styled.Text`
  font-size: 15px;
  color: ${colors.black};
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
