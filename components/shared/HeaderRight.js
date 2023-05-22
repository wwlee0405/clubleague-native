import React from "react";
import { Pressable, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../../colors";

export default function HeaderRight({ disabled, onPress }) {
  return (
    <Pressable  onPress={onPress}>
      <Feather
        name="check"
        size={25}
        color={colors.seaGreen}
        style={{ paddingRight: 15, opacity: disabled? 0.2 : 1,}}
      />
    </Pressable>
  );
}
