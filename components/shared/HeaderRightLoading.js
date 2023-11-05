import React from "react";
import { ActivityIndicator } from "react-native";
import { commonTheme } from "../../theme/commonTheme";

export default function HeaderRightLoading() {
  return (
    <ActivityIndicator
      size="small"
      color={commonTheme.seaGreen}
      style={{ marginRight: 15 }}
    />
  );
}
