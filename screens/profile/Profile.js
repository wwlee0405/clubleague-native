import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import UserProfile from "../../components/profile/UserProfile";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      userLeader {
        clubname
        emblem
      }
      userMember {
        club {
          id
          clubname
          emblem
        }
      }
      isMe
    }
  }
`;

export default function Profile({ navigation, route }) {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: route?.params?.username
    },
  });
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);

  console.log(data?.seeProfile?.userMember);

  return (
    <View backgroundColor="white">
      <UserProfile {...data?.seeProfile} />
    </View>
  );
}
