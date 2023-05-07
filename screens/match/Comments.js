import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { colors } from "../../colors";
import ScreenLayout from "../../components/ScreenLayout";
import Comments from "../../components/match/Comments";
import { COMMENT_FRAGMENT } from "../../fragments";

const SEE_GAME = gql`
  query seeGame($id: Int!) {
    seeGame(id: $id) {
      id
      comments {
        ...CommentFragment
      }
      commentNumber
    }
  }
  ${COMMENT_FRAGMENT}
`;

export default function CommentsScreen({ route }) {
  const { data, loading, refetch } = useQuery(SEE_GAME, {
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
        comments={data?.seeGame?.comments}
      />
    </ScreenLayout>
  )
}
