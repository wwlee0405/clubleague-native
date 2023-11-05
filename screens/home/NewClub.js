import React, { useRef, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";
import { Feather } from "@expo/vector-icons";
import { themeColors } from "../../themeColors";

const CREATE_CLUB = gql`
  mutation createClub(
    $clubname: String!
    $clubArea: String
    $clubBio: String
    $emblem: Upload
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

const View = styled.View``;
const Container = styled.View`
   justify-content: center;
   align-items: center;
   flex: 1;
   background-color: ${themeColors.white};
`;
const Emblem = styled.View`
   justify-content: center;
   align-items: center;
   width: 130px;
   height: 130px;
   border-radius: 65px;
   background-color: ${themeColors.seaGreen};
`;
const EmblemImg = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
`;
const TextInput = styled.TextInput`
	padding: 10px;
	background-color: ${themeColors.white};
	text-align: center;
	font-size: 20px;
`;
const ExplanationText = styled.Text`
   padding: 40px 70px;
   font-size: 15px;
   text-align: center;
`;
export default function NewClub({ route, navigation }) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      clubname: route?.params?.clubname,
    },
  });
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
  const onValid = ({ clubname, clubArea }) => {
    const emblem = new ReactNativeFile({
      uri: route.params.emblem,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (!loading) {
      createClubMutation({
        variables: {
          clubname,
          clubArea,
          emblem,
        },
      });
    }
  };
  useEffect(() => {
    register("clubname", {
      required: true,
    });
    register("clubArea", {
      required: true,
    });
  }, [register]);
  useEffect(() => {
    if (route.params?.emblem) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.emblem]);
  const clubnameWatch = !watch("clubname")
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        loading ?
        <HeaderRightLoading />
        :
        <HeaderRight disabled={clubnameWatch} onPress={handleSubmit(onValid)} />
      ),
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading, clubnameWatch]);
  console.log(route);
  return (
    <DismissKeyboard>
      <Container>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadEmblem")}>
            {route.params?.emblem ? (
              <EmblemImg resizeMode="contain" source={{ uri: route.params.emblem }} />
            ):(
              <Emblem>
                <Feather name="camera" size={40} style={{ color: themeColors.greyColor }} />
              </Emblem>
            )}
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
