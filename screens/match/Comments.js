import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { COMMENT_FRAGMENT } from "../../fragments";
import { commonTheme } from "../../theme/commonTheme";
import ScreenLayout from "../../components/ScreenLayout";
import Comment from "../../components/match/Comment";
import AuthButton from "../../components/auth/AuthButton";

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
const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($matchId: Int!, $payload: String!) {
    createComment(matchId: $matchId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const PostCommentContainer = styled.View`
  background-color: ${commonTheme.white};
  height: 55px;
  width: 100%;
  border-top: 1px solid ${commonTheme.emerald};
  padding-top: 15px;
  padding-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
`;
const PostCommentInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  padding: 5px 10px;
  border-radius: 7px;
`;
const Post = styled.View`
  background-color: ${commonTheme.yellow};
  height: 50px;
  width: 50px;
`;

export default function CommentsScreen({ route }) {
  const { data: meData } = useMe();
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
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
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && meData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...meData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment NewComment on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Match:${route.params.matchId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, {loading: updateComment}] = useMutation(
    CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
    },
  );
  const onValid = (data) => {
    const { payload } = data;
    if (updateComment) {
      return;
    }
    createCommentMutation({
      variables: {
        matchId: route.params.matchId,
        payload,
      },
    });
  };
  const renderComment = ({ item: comment }) => {
    return (
      <Comment
        id={comment?.id}
        matchId={route.params.matchId}
        author={comment?.user.username}
        payload={comment?.payload}
        isMine={comment?.isMine}
      />
    );
  };
  return (
    <ScreenLayout loading={loading}>    
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeGame?.comments}
        keyExtractor={(comment) => "" + comment.id}
        renderItem={renderComment}
      />


      <PostCommentContainer>
        <PostCommentInput
          {...register("payload", { required: true })}
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          placeholder="Write a comment..."
          onChangeText={(text) => setValue("payload", text)}
          onSubmitEditing={handleSubmit(onValid)}
        />
        <AuthButton
          text="Post"
          loading={loading}
          disabled={!watch("payload")}
          onPress={handleSubmit(onValid)}
        />
      </PostCommentContainer>
    </ScreenLayout>
  )
}
