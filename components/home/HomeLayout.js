import React from "react";
import { ActivityIndicator, View } from "react-native";
import { commonTheme } from "../../theme/commonTheme";

export default function HomeLayout({ loading, children }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: commonTheme.white,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
