import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function ScreenLayout({ backgroundColor, loading, children }) {
  return (
    <View style={{ flex:1, backgroundColor }}>
      {loading ? <ActivityIndicator color="white" /> : children}
    </View>
  );
}
