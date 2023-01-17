import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const View = styled.View`
  background-color: ${colors.grey00};
  flex: 1;
  align-items: ${(props) => (props.theme.center)};
  justify-content: ${(props) => (props.theme.center)};
`;
View.defaultProps = {
  theme: {
    center: "null"
  }
}

export default function ScreenLayout({ theme, loading, children }) {
  return (
    <View theme={theme}>
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
