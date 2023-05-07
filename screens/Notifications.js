import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import NotificationItem from "../components/notification/NotificationItem";

const SEE_NOTIFICATION = gql`
 query seeNotification($offset: Int!) {
   seeNotification(offset: $offset) {
     id
     payload
     user {
       username
     }

   }
 }
`;

export default function Notifications() {
  const { data, loading, refetch, fetchMore } = useQuery(SEE_NOTIFICATION, {
    variables: {
      offset: 0,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = ({ item: note }) => {
    return (
      <Pressable
        onPress={() => null}
      >
        <NotificationItem {...note} />
      </Pressable>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeNotification}
        keyExtractor={(note) => "" + note.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
