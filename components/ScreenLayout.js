import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../colors";

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
