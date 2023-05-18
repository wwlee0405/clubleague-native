import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Button = styled.TouchableOpacity`
  background-color: ${colors.seaGreen};

  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

export default function HeaderRight({ disabled, onPress }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      <Feather
        name="check"
        size={25}
        color={colors.darkGrey}
        style={{ paddingRight: 15 }}
      />
    </Button>
  );
}
