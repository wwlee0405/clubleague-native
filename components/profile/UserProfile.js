import React from "react";
import PropTypes from "prop-types";
import { View, Pressable, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme";

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
`;
const Property = styled.Text`
  font-size: 15px;
`;
const EditProfileBtn = styled.View`
  margin-top: 20px;
  margin-horizontal: 20px;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-width: 1px;
  border-color: ${commonTheme.emerald};
  border-radius: 8px;
`;
const EditProfileBtnText = styled.Text`
  font-weight: 600;
  color: ${commonTheme.emerald};
`;
const SubText = styled.Text`
  padding: 20px 0px 10px 20px;
  font-weight: bold;
`;
const ClubTeam = styled.View`
  margin-horizontal: 3px;
  border: 0.3px solid ${commonTheme.emerald};
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
  avatar,
  username,
  fullName,
  isMe,
  userMember,
}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const renderItem = ({ item: myClubs }) => (
    <Pressable
      onPress={() => navigation.navigate("Clubhouse", {
        clubId: myClubs?.club?.id,
    })}>
      <ClubTeam>
        <ClubEmblem source={require('../../data/2bar.jpg')} />
        <View>
          <ClubName 
            numberOfLines={3} 
            style={{color: colors.text}}
          >
            {myClubs?.club?.clubname}
          </ClubName>
        </View>
      </ClubTeam>
    </Pressable>
  );
  return (
    <View style={{backgroundColor: colors.background}}>
      <ProfileWrap>
        <AvatarWrap>
          <Pressable
            onPress={() => isMe ? navigation.navigate("UploadAvatar") : null}
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
            <NameTag style={{color: colors.subText}}>Username</NameTag>
            <Property style={{color: colors.text}}>{username}</Property>
          </View>
          <View>
            <NameTag style={{color: colors.subText}}>Name</NameTag>
            <Property style={{color: colors.text}}>{fullName}</Property>
          </View>
          <View>
            <NameTag style={{color: colors.subText}}>Area</NameTag>
            <Property style={{color: colors.text}}>Barcelona, Spain</Property>
          </View>
        </ProfileInfoWrap>
      </ProfileWrap>

      {isMe ? (
        <TouchableOpacity 
          onPress={() => navigation.navigate("EditProfile")}
        >
          <EditProfileBtn style={{backgroundColor: colors.background}}>
            <EditProfileBtnText>Edit Profile</EditProfileBtnText>
          </EditProfileBtn>
        </TouchableOpacity>
      ) : null}

      <SubText>My Club</SubText>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingStart: 17, paddingEnd: 17 }}
        data={userMember}
        keyExtractor={(myClubs) => "" + myClubs.club.clubname}
        renderItem={renderItem}
      />
    </View>
  );
}

UserProfile.propTypes = {
  avatar: PropTypes.string,
  isMe: PropTypes.bool,
  username: PropTypes.string,
  fullName: PropTypes.string,
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
