//삭제예정//

import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { commonTheme } from "../../theme/commonTheme";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import Comment from "./Comment";
import AuthButton from "../auth/AuthButton";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($matchId: Int!, $payload: String!) {
    createComment(matchId: $matchId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const CommentsContainer  = styled.View`
  margin-top: 0px;
  flex: 1;
`;
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 10px;
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

function Comments({ matchId, author, refreshing, refresh, comments }) {
  const { data: meData } = useMe();
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

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
        id: `Match:${matchId}`,
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

  const [createCommentMutation, {loading}] = useMutation(
    CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
    },
  );

  const onValid = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        matchId,
        payload,
      },
    });
  };

  const renderComment = ({ item: comment }) => {
    return (
      <Comment
        id={comment?.id}
        matchId={matchId}
        author={comment?.user.username}
        payload={comment?.payload}
        isMine={comment?.isMine}
      />
    );
  };
  return (
    <CommentsContainer>
      <Text>{author}</Text>
      <FlatList
        refreshing={refreshing}
        onRefresh={refresh}
        data={comments}
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

    </CommentsContainer>
  );
}

Comments.propTypes = {
  matchId: PropTypes.number.isRequired,
  author: PropTypes.string,
  caption: PropTypes.string,
  commentNumber: PropTypes.number,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string,
      }),
      payload: PropTypes.string,
      isMine: PropTypes.bool,
      createdAt: PropTypes.string,
    })
  ),
};

export default Comments;
