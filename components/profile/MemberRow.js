import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
`;

function MemberRow({ user, boardAuth }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <Wrapper>
      <Column
        onPress={() => navigation.navigate("Profile",{
          username: user.username,
          id: user.id,
        })}
      >
        {user.avatar ? 
          <Avatar source={{ uri: user.avatar }} /> 
          : 
          <Avatar source={require('../../data/gggg.jpg')} />
        }
        <Username style={{color: colors.text}}>{user.username}</Username>
        {boardAuth ? <MaterialCommunityIcons name="crown" size={20} color={colors.symbolColor} />: null}
      </Column>
    </Wrapper>
  );
}

MemberRow.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  boardAuth: PropTypes.bool,
};

export default MemberRow;
