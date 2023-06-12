import React from "react";
import PropTypes from "prop-types";
import { View, Text, Pressable, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
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
const Avatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
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
const SubText = styled.Text`
  padding: 20px 0px 10px 20px;
  font-weight: bold;
`;
const ClubTeam = styled.View`
  margin-horizontal: 3px;
  border: 0.3px solid ${colors.emerald};
  border-radius: 8px;
  width: 100px;
  height: 140px;
  align-items: center;
  padding: 15px 20px;
`;
const ClubEmblem = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;
const ClubName = styled.Text`
  font-weight: bold;
`;

function UserProfile({
  id,
  onPress,
  avatar,
  username,
  firstName,
  lastName,
  isMe,
  userMember,
}) {
  const navigation = useNavigation();
  const renderItem = ({ item: myClubs }) => (
    <Pressable
      onPress={() => navigation.navigate("Clubhouse", {
        clubId: myClubs?.club?.id,
    })}>
      <ClubTeam>
        <ClubEmblem source={require('../../data/2bar.jpg')} />
        <View>
          <ClubName numberOfLines={3}>{myClubs?.club?.clubname}</ClubName>
        </View>
      </ClubTeam>
    </Pressable>
  );
  return (
    <Container>
      <ProfileWrap>
        <AvatarWrap>
          <Pressable
            onPress={() => isMe ? navigation.navigate("UploadAvatar",{
              id,
            }) : null}
          >
            {avatar ? (
              <Avatar source={{ uri: avatar }} />
            ) : (
              <Avatar source={require('../../data/dddd.jpg')} />
            )}
          </Pressable>
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

      {isMe ? (
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <EditProfileBtn>
            <EditProfileBtnText>Edit Profile</EditProfileBtnText>
          </EditProfileBtn>
        </TouchableOpacity>
      ) : null}

      <SubText>My Club</SubText>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingStart: 20, paddingEnd: 20 }}
        data={userMember}
        keyExtractor={(myClubs) => "" + myClubs.club.clubname}
        renderItem={renderItem}
      />
    </Container>
  );
}

UserProfile.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
  isMe: PropTypes.bool,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userMember: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
      }),
    }),
  ),
};

export default UserProfile;
