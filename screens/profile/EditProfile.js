import React from "react";
import { Text, View } from "react-native";
import { TextInput } from "../../components/auth/AuthShared";

export default function EditProfile({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>EditProfile</Text>
      <TextInput
        placeholder="First Name"
        returnKeyType="next"
      />
    </View>
  );
}
