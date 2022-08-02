import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, FlatList } from "react-native";
import UserEntryRow from "../../components/match/UserEntryRow";
import { useNavigation } from "@react-navigation/native";

const SEE_MATCH_ENTRIES = gql`
  query seeMatchEntries($id: Int!) {
    seeMatchEntries(id: $id) {
      id
      user {
        id
        username
      }
      isEntry
      createdAt
    }
  }
`;

export default function Entry({ route }) {
  const navigation = useNavigation();
  const { data, loading, refetch } = useQuery(SEE_MATCH_ENTRIES, {
    variables: {
      id: route?.params?.matchId,
    },
  });
  const renderEntry = ({ item: entry }) => {
    return (
      <UserEntryRow
        onPress={() => navigation.navigate("Profile",{
          username: entry?.user.username,
          id: entry?.user.id,
        })}
        username={entry?.user.username}
      />
    );
  };

  console.log(data?.seeMatchEntries);
  return (
    <View>
      <FlatList
        data={data?.seeMatchEntries}
        keyExtractor={(entry) => "" + entry.id}
        renderItem={renderEntry}
      />
    </View>
  )
}
