import React from "react";
import TabIcon from "../components/nav/TabIcon";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

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
  font-weight: bold;
`;
const TextBottom = styled.Text`
  margin-top: -3px;
  font-size: 12px;
`;

export default function HeaderAvatar({ onPress, image, topData, bottomData }) {
  const { colors } = useTheme();
  return (
    <ButtonTochable onPress={onPress}>
      {image ?
        (<Wrapper>
          <Avatar resizeMode="cover" source={{ uri: image }} />
          <TextData>
            <TextTop style={{ color: colors.text }}>{topData}</TextTop>
            <TextBottom style={{ color: colors.subText }}>{bottomData}</TextBottom>
          </TextData>
        </Wrapper>)
        :
        (<Wrapper>
          <Avatar resizeMode="cover" source={require('../data/cccc.jpg')} />
          <TextData>
            <TextTop style={{ color: colors.text }}>{topData}</TextTop>
            <TextBottom style={{ color: colors.subText }}>{bottomData}</TextBottom>
          </TextData>
        </Wrapper>)
      }
    </ButtonTochable>
  );
}
