import { gql, useMutation } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Text, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.View`
  flex-direction: row;
  margin: 0px 10px 8px;
`;
const CommentData = styled.View`
  margin-left: 10px;
  width: 80%;
`;
const UserAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;
const Username = styled.Text`
  font-weight: 600;
  font-size: 15px;
`;
const CommentCaption = styled.Text`
`;

function Comment({ id, matchId, isMine, author, payload }) {
  const { colors } = useTheme();
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Match:${matchId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <UserAvatar source={require('../../data/gggg.jpg')} />
      <CommentData>
        <Username style={{color: colors.text}}>{author}</Username>
        <CommentCaption style={{color: colors.text}}>{payload}</CommentCaption>
      </CommentData>
      { isMine ? <TouchableOpacity onPress={onDeleteClick}><Text>삭제</Text></TouchableOpacity> : null }
    </CommentContainer>
  );
}

Comment.propTypes = {
  isMine: PropTypes.bool,
  id: PropTypes.number,
  matchId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
