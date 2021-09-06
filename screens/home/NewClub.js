import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
   TouchableWithoutFeedback,
   Keyboard,
   Alert,
   TouchableOpacity,
   Text,
   ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../colors";

const View = styled.View``;
const Container = styled.View`
   justify-content: center;
   align-items: center;
   flex: 1;
   background-color: ${colors.white};
`;
const Avatar = styled.View`
   justify-content: center;
   align-items: center;
   width: 130px;
   height: 130px;
   border-radius: 100px;
   background-color: ${colors.seaGreen};
`;
const TextInput = styled.TextInput`
	padding: 10px;
	background-color: ${colors.white};
	text-align: center;
	font-size: 20px;
`;
const ExplanationText = styled.Text`
   padding: 40px 70px;
   font-size: 15px;
   text-align: center;
`;

const CREATE_CLUB = gql`
  mutation createClub(
    $clubname: String!
    $clubArea: String
    $clubBio: String
    $emblem: String
  ) {
    createClub(
      clubname: $clubname
      clubArea: $clubArea
      clubBio: $clubBio
      emblem: $emblem
    ) {
      ok
      error
    }
  }
`;

export default function NewClub({ navigation }) {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const onCompleted = (data) => {
    const {
      createClub: { ok },
    } = data;
    const { clubname, clubArea } = getValues();
    if (ok) {
      navigation.navigate("Feed", {
        clubname,
        clubArea,
      });
    }
  };
  const [createClubMutation, { loading }] = useMutation(CREATE_CLUB, {
    onCompleted,
  });
  const clubnameRef = useRef();
  const clubAreaRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
    if (!loading) {
      createClubMutation({
        variables: {
          ...data,
        },
      });
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <Feather name="check" size={25} style={{ paddingRight: 10 }} />
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    register("clubname", {
      required: true,
    });
    register("clubArea", {
      required: true,
    });
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  return (
    <DismissKeyboard>
      <Container>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity onPress={() => alert("edit img")}>
            <Avatar>
              <Feather name="camera" size={40} style={{ color: colors.greyColor }} />
            </Avatar>
          </TouchableOpacity>
        </View>
         <TextInput
           ref={clubnameRef}
           placeholder="Input Club Name"
           returnKeyType="next"
           onSubmitEditing={() => onNext(clubAreaRef)}
           placeholderTextColor={"#c7c7c7"}
           onChangeText={(text) => setValue("clubname", text)}
         />
         <TextInput
           ref={clubAreaRef}
           placeholder="Input Club Area"
           autoCapitalize="words"
           returnKeyType="done"
           placeholderTextColor={"#c7c7c7"}
           onChangeText={(text) => setValue("clubArea", text)}
           onSubmitEditing={handleSubmit(onValid)}
         />
         <ExplanationText>You can change club name and picture after you create it.</ExplanationText>
      </Container>
    </DismissKeyboard>
  );
}
