import React from "react";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { commonTheme } from "../../theme/commonTheme";

export default function HeaderRight({ disabled, onPress }) {
  return (
    <Pressable  onPress={onPress}>
      <Feather
        name="check"
        size={25}
        color={commonTheme.seaGreen}
        style={{ paddingRight: 15, opacity: disabled? 0.2 : 1,}}
      />
    </Pressable>
  );
}
