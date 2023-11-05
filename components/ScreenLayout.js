import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function ScreenLayout({ loading, children }) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.background }}>
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
