import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import UserProfileRow from "../../components/profile/UserProfileRow";

const SEE_MATCH_ENTRIES = gql`
  query seeMatchEntries($id: Int!) {
    seeMatchEntries(id: $id) {
      id
      user {
        id
        username
        avatar
      }
      createdAt
    }
  }
`;

export default function Entry({ route }) {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(SEE_MATCH_ENTRIES, {
    variables: {
      id: route?.params?.gameId,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const renderEntry = ({ item: entry }) => {
    return (
      <UserProfileRow
        onPress={() => navigation.navigate("Profile",{
          username: entry?.user.username,
          id: entry?.user.id,
        })}
        avatar={entry?.user.avatar}
        username={entry?.user.username}
      />
    );
  };

  console.log(data?.seeMatchEntries);
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeMatchEntries}
        keyExtractor={(entry) => "" + entry.id}
        renderItem={renderEntry}
        refreshing={refreshing}
        refresh={refresh}
      />
    </ScreenLayout>
  )
}
