import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
`;
const Column = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: ${commonTheme.black};
`;

function UserProfileRow({ onPress, avatar, username }) {
  return (
    <Wrapper>
      <Column onPress={onPress}>
        {avatar ? 
          <Avatar source={{ uri: avatar }} /> 
          : 
          <Avatar source={require('../../data/gggg.jpg')} />
        }
        <Username>{username}</Username>
      </Column>
    </Wrapper>
  );
}

UserProfileRow.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UserProfileRow;
