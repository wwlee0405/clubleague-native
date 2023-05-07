import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { View } from "react-native";
import UserProfile from "../../components/profile/UserProfile";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
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
  console.log(data?.seeProfile);
  console.log(route);

  return (
    <View style={{ backgroundColor: "white", flex: 1}}>
      <UserProfile {...data?.seeProfile} />
    </View>
  );
}
