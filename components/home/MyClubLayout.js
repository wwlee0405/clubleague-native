import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { commonTheme } from "../../theme/commonTheme";

export default function ScreenLayout({ clubLoading, children }) {
  return (
    <View
      style={{
        backgroundColor: commonTheme.blue,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {clubLoading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
