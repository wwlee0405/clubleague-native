import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";
import MemberRow from "../../components/profile/MemberRow";

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
        boardAuth
      }
    }
  }
`;

const MemberCount = styled.Text`
  opacity: 0.7;
  margin: 5px 15px;
  font-size: 12px;
  color: ${colors.darkGrey};
`;

export default function ClubMember({ route }) {
  const navigation = useNavigation();
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const renderMember = ({ item: member }) => {
    return <MemberRow {...member} />;
  };
  return (
    <View>
      <MemberCount>
        {data?.seeClub?.totalMember === 1 ?
          "1 member" : `${data?.seeClub?.totalMember} members`
        }
      </MemberCount>
      <FlatList
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
