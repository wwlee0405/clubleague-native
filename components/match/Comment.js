import { gql, useMutation } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";

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
  color: ${colors.black};
  font-weight: 600;
  font-size: 15px;
`;
const CommentCaption = styled.Text`
`;

function Comment({ id, matchId, isMine, author, payload }) {
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
        <Username>{author}</Username>
        <CommentCaption>{payload}</CommentCaption>
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
