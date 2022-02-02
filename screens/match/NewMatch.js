import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import styled from "styled-components/native";
import { colors } from "../../colors";

const TextInput = styled.TextInput`
  padding-horizontal: 15px;
  padding-top: 15px;
	background-color: ${colors.white};
`;

export default function NewMatch({ navigation, route }) {
  const { setValue } = useForm();

  console.log(route);

  return (
    <DismissKeyboard>
      <View>
        <TextInput
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
          placeholder="If you make match, select match icon below."
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => (text)}
        />
        <Text>Sports</Text>
        <Text>Date</Text>
        <Text>Time</Text>
        <Text>Location</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SelectClub")}>
          <Text>Home</Text>
          <Text>Post: </Text>
        </TouchableOpacity>
        <Text>Away</Text>
      </View>
    </DismissKeyboard>
  )
}
