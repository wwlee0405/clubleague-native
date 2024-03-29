import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { commonTheme } from "../theme/commonTheme";

const ButtonTouchable = styled.TouchableOpacity`
  background-color: ${(props) => (props.buttonColor.main)};
  justify-content: center;
  border-radius: 8px;
  width: 100px;
  height: 40px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.textColor.main)};
  text-align: center;
`;
ButtonTouchable.defaultProps = {
  buttonColor: {
    main: commonTheme.blue
  }
}
ButtonText.defaultProps = {
  textColor: {
    main: commonTheme.white
  }
}

export default function Button({
  onPress,
  loading,
  buttonColor,
  textColor,
  text,
}) {
  return (
    <ButtonTouchable buttonColor={buttonColor} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText textColor={textColor}>{text}</ButtonText>
      )}
    </ButtonTouchable>
  );
}
