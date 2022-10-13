import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const ButtonTochable = styled.TouchableOpacity`
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
ButtonTochable.defaultProps = {
  buttonColor: {
    main: colors.blue
  }
}
ButtonText.defaultProps = {
  textColor: {
    main: colors.white
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
    <ButtonTochable buttonColor={buttonColor} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText textColor={textColor}>{text}</ButtonText>
      )}
    </ButtonTochable>
  );
}
