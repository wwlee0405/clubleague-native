import React from "react";
import PropTypes from "prop-types";
import { View, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components/native";
import { colors } from "../../colors";

const UserData = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px;
`;
const Column = styled.View`
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
  color: ${colors.black};
`;
const Checkbox = styled.View`
  position: absolute;
  bottom: 5px;
  right: 15px;
`;

function UserRowCheckbox({
  onPress,
  avatar,
  username,
  id,
  choice
}) {
  return (
    <Pressable onPress={onPress}>
      <UserData>
        {avatar ? (
          <Column>
            <Avatar source={{ uri: avatar }} />
            <Username>{username}</Username>
          </Column>
        ) : (
          <Column>
            <Avatar source={require('../../data/gggg.jpg')} />
            <Username>{username}</Username>
          </Column>
        )}
      </UserData>
      <Checkbox>
        <MaterialCommunityIcons
          name={id === choice ?
            "checkbox-marked-circle"
            :
            "checkbox-blank-circle-outline"
          }
          size={26}
          color={id === choice ?
            colors.seaGreen
            :
            colors.grey03
          }
        />
      </Checkbox>
    </Pressable>
  );
}

UserRowCheckbox.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  id: PropTypes.number,
};

export default UserRowCheckbox;
