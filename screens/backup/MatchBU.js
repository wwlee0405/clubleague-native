import React, { useState, useEffect } from "react";
import { colors } from "../colors";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Match({ navigation }) {
  const MatchsButton = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("NewMatch")}
      >
        <FontAwesome name="plus-square-o" color="#2e8b57" size={25} />
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MatchsButton,
    });
  }, []);
  return (
    <View>
      <Text>Match</Text>
    </View>
  )
}
