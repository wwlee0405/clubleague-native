import React from "react";
import { ActivityIndicator } from "react-native";
import { colors } from "../../colors";

export default function HeaderRightLoading() {
  return (
    <ActivityIndicator
      size="small"
      color={colors.seaGreen}
      style={{ marginRight: 15 }}
    />
  );
}
