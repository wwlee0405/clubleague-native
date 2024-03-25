import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { commonTheme } from "../../theme/commonTheme";

const ButtonTouchable = styled.TouchableOpacity`
  background-color: ${(props) => (props.buttonColor.main)};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 200px;
  height: 50px;
`;
const ButtonText = styled.Text`
  color: ${(props) => (props.textColor.main)};
  text-align: center;
  font-weight: 600;
  font-size: 15px;
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

export default function EntryButton({
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
