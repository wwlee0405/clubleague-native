import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../colors";
import DismissKeyboard from "../../components/DismissKeyboard";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($bio:String, $avatar:Upload){
    editProfile(bio:$bio, avatar:$avatar){
      ok
      error
      id
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadAvatarForm({ route, navigation }) {


  const updateEditProfile = (cache, result) => {
    const {
      data: {
        editProfile: { ok, id },
      },
    } = result;
    if (ok) {
      /* const newProfile = {
        __typename: "User",
        createdAt: Date.now() + "",
        isMe: true,
      };
      const newCacheProfile = cache.writeFragment({
        data: newProfile,
        fragment: gql`
          fragment BSName on User {
            isMe
          }
        `,
      });
      cache.modify({
        id: `User:${id}`,
        fields: {
          avatar(prev) {
            return [...prev, newCacheProfile];
          },
        },
      }); */
      navigation.navigate("Me");
    }
  };
  const [editProfileMutation, { loading, error }] = useMutation(
    EDIT_PROFILE_MUTATION,
    {
      update: updateEditProfile
    }
  );
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("bio");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ bio }) => {
    const avatar = new ReactNativeFile({
      uri: route.params.avatar,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    editProfileMutation({
      variables: {
        bio,
        avatar,
      },
    });
  };

  console.log(error);
  
  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.avatar }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("bio", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  )
}
