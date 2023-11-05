import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const avatarDimensions = '40px'
const UserData = styled.View`
  padding: 0px 0px;
  width: ${avatarDimensions};
`;
const Avatar = styled.Image`
  width: ${avatarDimensions};
  height: ${avatarDimensions};
  border-radius: 20px;
`;
const Username = styled.Text`
  padding-top: 1px;
  font-size: 10px;
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

function UserColumn({ avatar, username }) {
  const { colors } = useTheme();
  return (
    <UserData>
      <Avatar source={require('../../data/eeee.png')} />
      <Username 
        numberOfLines={1}
        style={{color: colors.text}}
      >
        {username}
      </Username>
    </UserData>
  );
}

UserColumn.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UserColumn;
