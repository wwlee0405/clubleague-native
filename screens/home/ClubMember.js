import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, Text, FlatList } from "react-native";
import UserProfileRow from "../../components/profile/UserProfileRow";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../../fragments";

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
        user {
          avatar
          username
        }
      }
    }
  }
`;

const MemberCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 15px;
`;

export default function ClubMember({ route, clubId }) {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const renderMember = ({ item: member }) => {
    return (
      <UserProfileRow
        onPress={() => navigation.navigate("Profile",{
          username: member?.user.username,
          id: member?.user.id,
        })}
        avatar={member?.user.avatar}
        username={member?.user.username}
      />
    );
  };

 console.log(data?.seeClub);
  return (
    <View>
      <Text>ClubMember</Text>
      <MemberCount>{data?.seeClub?.totalMember === 1 ? "1 member" : `${data?.seeClub?.totalMember} members`}</MemberCount>
      <FlatList
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
