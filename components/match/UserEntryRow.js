import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
`;
const Column = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
`;
const Username = styled.Text`
  font-weight: 600;
  color: ${colors.black};
`;

function UserEntryRow({ onPress, avatar, username }) {
  return (
    <Wrapper>
      <Column onPress={onPress}>
        <Avatar source={require('../../data/gggg.jpg')} />
        <Username>{username}</Username>
      </Column>
    </Wrapper>
  );
}

UserEntryRow.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default UserEntryRow;
