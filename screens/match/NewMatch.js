import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import styled from "styled-components/native";
import { colors } from "../../colors";

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const TextInput = styled.TextInput`
  padding-horizontal: 15px;
  padding-top: 15px;
	background-color: ${colors.white};
`;
const LabelText = styled.Text`
  font-size: 15px;
  color: ${colors.yellow};
`;
const SubmitText = styled.Text`
  font-size: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;
const BtnRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  margin-left: 50px;
  background-color: ${colors.greyColor};
`;
const UpDownBtn = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue};
`;
const BtnText = styled.Text`
  color: ${colors.white};
  align-items: center;
`;

export default function NewMatch({ navigation, route }) {
  const { setValue } = useForm();

  React.useEffect(() => {
    if (route.params?.homeClub) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.homeClub]);

  const [awayCount, setAwayCount] = useState(1);

  const HeaderRight = () => (
    <TouchableOpacity
    onPress={() =>
      navigation.navigate("Match")
    }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

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
        <Pressable onPress={() => navigation.navigate("SelectClub")}>
          <LabelText>Home</LabelText>
          <SubmitText>{route.params?.homeClub}</SubmitText>
        </Pressable>
        <LabelText>Away</LabelText>
        <Row>
          <SubmitText>{awayCount}</SubmitText>
          <BtnRow>
            <TouchableOpacity onPress={() => setAwayCount(awayCount + 1)}>
              <UpDownBtn>
                <BtnText>+</BtnText>
              </UpDownBtn>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAwayCount(awayCount - 1)}>
              <UpDownBtn>
                <BtnText>-</BtnText>
              </UpDownBtn>
            </TouchableOpacity>
          </BtnRow>
        </Row>
      </View>
    </DismissKeyboard>
  )
}
