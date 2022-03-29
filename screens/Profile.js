import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import useMe, { ME_QUERY } from "../hooks/useMe";

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
          clubname
          emblem
        }
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
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

  console.log(data);

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Someones Profile</Text>
    </View>
  );
}
