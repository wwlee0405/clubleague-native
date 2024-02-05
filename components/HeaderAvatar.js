import React from "react";
import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons'; 
import { useTheme } from "@react-navigation/native";

const ButtonTochable = styled.Pressable`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.View`  
  flex-direction: row;
  align-items: center;
`;
const Action = styled.Pressable`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
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

export default function HeaderAvatar({ onPress, image, topData, bottomData, modalVisible }) {
  const { colors } = useTheme();
  return (
    <ButtonTochable onPress={onPress}>
      <Wrapper>
        {image ? 
          <Avatar resizeMode="cover" source={{ uri: image }} />
          :
          <Avatar resizeMode="cover" source={require('../data/cccc.jpg')} />
        }
        <TextData>
          <TextTop style={{ color: colors.text }}>{topData}</TextTop>
          <TextBottom style={{ color: colors.subText }}>{bottomData}</TextBottom>
        </TextData>
      </Wrapper>
      <Action onPress={modalVisible}>
        <Entypo name="dots-three-horizontal" size={22} color={colors.subText} />
      </Action>
    </ButtonTochable>
  );
}