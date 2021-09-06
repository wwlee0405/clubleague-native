import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { colors } from "../../colors";

export default function ScreenLayout({ clubLoading, children }) {
  return (
    <View
      style={{
        backgroundColor: colors.blue,
        height: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {clubLoading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
