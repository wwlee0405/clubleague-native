import React, { useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { ActivityIndicator, TouchableOpacity, Text, View } from "react-native";
import { TextInput } from "../../components/auth/AuthShared";
import DismissKeyboard from "../../components/DismissKeyboard";
import useMe, { ME_QUERY } from "../../hooks/useMe";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($bio:String, $avatar:Upload){
    editProfile(bio:$bio, avatar:$avatar){
      ok
      error
      id
    }
  }
`;

const HeaderRightText = styled.Text`
color: ${colors.blue};
font-size: 16px;
font-weight: 600;
margin-right: 7px;
`;

export default function EditProfile({ navigation, route }) {
  const { data: userData } = useMe();

  console.log(userData);
  console.log(userData.me.bio);
  const onCompleted = (cache, result) => {
    const {
      editProfile: { ok, id },
    } = result;
    if (editProfile.id) {
      const newProfile = {
        __typename: "User",
        createdAt: Date.now() + "",
        id,
        avatar,
        bio,
      };
      const newCacheProfile = cache.writeFragment({
        data: newProfile,
        fragment: gql`
          fragment BSName on User {
            id
            createdAt
            avatar
            bio
          }
        `,
      });

      cache.modify({
        id: `User:${userData.me.id}`,
        fields: {
          bio(prev) {
            return [...prev, newCacheProfile];
          },
        },
      });
      navigation.navigate("Profile");
    }

  };
  const [editProfileMutation, { loading, error }] = useMutation(
    EDIT_PROFILE_MUTATION, {
      update: onCompleted,
    },
  );
  const { register, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("bio", {
      required: true,
    });
  }, [register]);
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="red" style={{ marginRight: 10 }} />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({ bio }) => {
    editProfileMutation({
      variables: {
        bio,
      },
    });
  };
  return (
    <DismissKeyboard>
      <TextInput
        placeholder="bio"
        returnKeyType="next"
        onChangeText={(text) => setValue("bio", text)}
      />
    </DismissKeyboard>
  );
}
