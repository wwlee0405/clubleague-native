import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";


const CommentContainer = styled.View`
  flex-direction: row;
`;
const UserData = styled.View`
  flex-direction: row;
  margin: 0px 10px;
`;
const UserAvatar = styled.Image`
  width: 35px;
  height: 35px;
  border-radius: 17.5px;
`;
const Username = styled.Text`
  color: ${colors.black};
  font-weight: 600;
  margin-left: 10px;
`;
const CommentCaption = styled.Text`
  margin-left: 10px;
`;

function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <UserData>
        <UserAvatar source={require('../../data/gggg.jpg')} />
        <Username>{author}</Username>
      </UserData>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
