import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { colors } from "../../colors";
import ScreenLayout from "../../components/ScreenLayout";
import Comments from "../../components/match/Comments";

const SEE_MATCH_COMMENTS = gql`
  query seeMatchComments($id: Int!) {
    seeMatchComments(id: $id) {
      id
      user {
        id
        username
        avatar
      }
      payload
      isMine
      createdAt
    }
  }
`;

export default function CommentsScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_MATCH_COMMENTS, {
    variables: {
      id: route?.params?.matchId,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  console.log(data);
  return (
    <ScreenLayout loading={loading}>
      <Comments
        matchId={route.params.matchId}
        refreshing={refreshing}
        refresh={refresh}
        comments={data?.seeMatchComments}
      />
    </ScreenLayout>
  )
}
