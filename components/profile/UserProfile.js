import React from "react";
import PropTypes from "prop-types";
import { View, Text, Pressable, TouchableOpacity, Image, FlatList } from "react-native";
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
const Touchable = styled.Pressable`
  margin-horizontal: 3px;
`;
const ClubTeam = styled.View`
  border: 0.3px solid ${colors.emerald};
  border-radius: 8px;
  width: 100px;
  height: 140px;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
`;
const ClubEmblem = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;
const ClubName = styled.Text`
  font-weight: bold;
  width: 100%;
  overflow: hidden;
`;

function UserProfile({ onPress, avatar, username, firstName, lastName, userMember, isMe }) {
  const navigation = useNavigation();
  const renderItem = ({ item: myClubs }) => (
    <Touchable onPress={null}>
      <ClubTeam>
        <ClubEmblem source={require('../../data/2bar.jpg')} />
        <View>
          <ClubName numberOfLines={1}>{myClubs?.club?.clubname}</ClubName>
        </View>
      </ClubTeam>
    </Touchable>
  );
  return (
    <Container>
      <ProfileWrap>
        <AvatarWrap>
          <TouchableOpacity onPress={() => null}>
            {avatar ?
              <Image
                source={{ uri: avatar }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
              />
              :
              <Image
                source={require('../../data/dddd.jpg')}
                style={{ width: 120, height: 120, borderRadius: 60 }}
              />
            }
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
  avatar: PropTypes.string,
  isMe: PropTypes.bool,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userMember: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        clubname: PropTypes.string,
      }),
    }),
  ),

};

export default UserProfile;
