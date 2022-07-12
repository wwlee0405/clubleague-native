import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import Comment from "./Comment";

const CommentsContainer  = styled.View`
  margin-top: 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.7;
  margin: 10px 0px;
  font-weight: 600;
  font-size: 10px;
`;

function Comments({ id, author, caption, commentNumber, comments }) {

  const renderComment = ({ item: comment }) => {
    return (
      <Comment
        author={comment?.user.username}
        payload={comment?.payload}
      />
    );
  };
  return (
    <CommentsContainer>
      <Text>{author}</Text>
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      <FlatList
        data={comments}
        keyExtractor={(comment) => "" + comment.id}
        renderItem={renderComment}
      />
    </CommentsContainer>
  );
}

Comments.propTypes = {
  author: PropTypes.string,
  caption: PropTypes.string,
  commentNumber: PropTypes.number,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
      isMine: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;
