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
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
      $lastName: String
      $bio: String
    ) {
      editProfile(
        bio: $bio
      ) {
        error
        id
        ok
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
  
  const onCompleted = (cache, result) => {
    const {
      data: {
        editProfile: { ok, id },
      },
    } = result;
    if (ok) {
      
      navigation.navigate("Profile");
    }

  };
  const [editProfileMutation, { loading, error }] = useMutation(
    EDIT_PROFILE_MUTATION, {
      update: onCompleted,
    },
  );
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      bio: userData?.me?.bio,
    }
  });
  
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const bioRef = useRef();
  useEffect(() => {
    register("bio", {
      required: true,
    });
  }, [register]);
  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        loading ?
        <HeaderRightLoading />
        :
        <HeaderRight onPress={handleSubmit(onValid)} />
      ),
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  const onValid = ({  bio }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          bio,
        },
      });
    }
  };

  console.log(route);
  console.log(userData);

  return (
    <DismissKeyboard>
     
      <TextInput
        placeholder="bio"
        defaultValue={userData?.me?.bio}
        returnKeyType="done"
        onChangeText={(text) => setValue("bio", text)}
      />
    </DismissKeyboard>
  );
}
