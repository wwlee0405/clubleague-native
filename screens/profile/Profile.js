import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View } from "react-native";
import UserProfile from "../../components/profile/UserProfile";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      avatar
      bio
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
    <View style={{ backgroundColor: "white", }}>
      <UserProfile {...data?.seeProfile} />
    </View>
  );
}
