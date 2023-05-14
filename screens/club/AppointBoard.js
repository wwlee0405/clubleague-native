import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserProfileRow from "../../components/profile/UserProfileRow";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";

const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      totalMember
      clubLeader {
        username
      }
      clubMember {
        id
        boardAuth
        memberAuth
        user {
          avatar
          username
        }
      }
    }
  }
`;

const avatarDimensions = '40px'
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 15px;
`;
const Top = styled.View`
  padding-horizontal: 15px;
`;
const Title = styled.Text`
  margin: 5px 15px;
  font-size: 12px;
  color: ${colors.darkGrey};
`;
const UserData = styled.View`
  padding: 10px 0px;
  width: ${avatarDimensions};
`;
const Avatar = styled.Image`
  width: ${avatarDimensions};
  height: ${avatarDimensions};
  border-radius: 20px;
`;
const UsernameText = styled.Text`
  padding-top: 1px;
  font-size: 10px;
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

export default function AppointBoard({ route }) {
  const navigation = useNavigation();
  const [chosenMember, setChosenMember] = useState("");
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const chooseMember = (user) => {
    setChosenMember(user);
  };
  const renderBoard = ({ item: board }) => {
    return (
      <View
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 15 }}
      >
        {board.boardAuth === true ? (
          <UserData>
            <Avatar source={require('../../data/eeee.png')} />
            <UsernameText numberOfLines={1}>{board?.user.username}</UsernameText>
          </UserData>
        ) : null}
      </View>
    );
  };
  const renderMember = ({ item: member }) => {
    return (
      <View>
        {member.boardAuth !== true ? (
          <TouchableOpacity
            onPress={() => setChosenMember(member.user.username)}
          >
            <UserProfileRow
              avatar={member?.user.avatar}
              username={member?.user.username}
            />
            <IconContainer>
              <MaterialCommunityIcons
                name={member?.user.username === chosenMember ? "checkbox-marked-circle" : "checkbox-blank-circle-outline"}
                size={26}
                color={member?.user.username === chosenMember ? colors.seaGreen : colors.grey03}
              />
            </IconContainer>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <Top>
      {chosenMember !== "" ? (
        <UserData>
          <Avatar source={require('../../data/gggg.jpg')} />
          <UsernameText numberOfLines={1}>{chosenMember}</UsernameText>
        </UserData>
      ) : null}
      </Top>

      <Title>Board</Title>
      <FlatList
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderBoard}
      />

      <Title>Member</Title>
      <FlatList
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
