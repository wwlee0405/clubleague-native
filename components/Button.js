import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const ButtonTochable = styled.TouchableOpacity`
  background-color: ${props => props.primary ? colors.blue : colors.lightGrey};
  justify-content: center;
  border-radius: 8px;
  width: 100px;
  height: 40px;
`;
const ButtonText = styled.Text`
  color: ${props => props.primary ? colors.white : colors.black};
  text-align: center;
`;

export default function Button({ onPress, primary, text, loading }) {
  return (
    <ButtonTochable primary={primary} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText primary={primary}>{text}</ButtonText>
      )}
    </ButtonTochable>
  );
}
