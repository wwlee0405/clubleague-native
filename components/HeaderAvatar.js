import React from "react";
import TabIcon from "../components/nav/TabIcon";
import styled from "styled-components/native";
import { colors } from "../colors";

const ButtonTochable = styled.Pressable``;
const Wrapper = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
`;
const Avatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const TextData = styled.View``;
const TextTop = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;
const TextBottom = styled.Text`
  margin-top: -3px;
  font-size: 12px;
`;

export default function HeaderAvatar({ onPress, avatar, topData, bottomData }) {
  return (
    <ButtonTochable onPress={onPress}>
      {avatar ?
        (<Wrapper>
          <Avatar resizeMode="cover" source={{ uri: avatar }} />
          <TextData>
            <TextTop>{topData}</TextTop>
            <TextBottom>{bottomData}</TextBottom>
          </TextData>
        </Wrapper>)
        :
        (<Wrapper>
          <Avatar resizeMode="cover" source={require('../data/cccc.jpg')} />
          <TextData>
            <TextTop>{topData}</TextTop>
            <TextBottom>{bottomData}</TextBottom>
          </TextData>
        </Wrapper>)
      }
    </ButtonTochable>
  );
}
