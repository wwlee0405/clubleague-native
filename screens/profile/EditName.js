import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { themeColors } from "../../themeColors";
import { TextInput } from "../../components/auth/AuthShared";
import DismissKeyboard from "../../components/DismissKeyboard";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($fullName: String) {
    editProfile(fullName: $fullName) {
      error
      id
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${themeColors.white};
  padding: 10px 20px;
`;

export default function EditName({ navigation }) {
  const { data: userData } = useMe();
  const onCompleted = (cache, result) => {
    const {
      data: {
        editProfile: { ok, id },
      },
    } = result;
    if (ok) {
      
      navigation.navigate("EditProfile");
    }

  };
  const [editProfileMutation, { loading, error }] = useMutation(
    EDIT_PROFILE_MUTATION, {
      update: onCompleted,
    },
  );
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fullName: userData?.me?.fullName,
    }
  });
  useEffect(() => {
    register("fullName", {
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
  const onValid = ({ fullName }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          fullName,
        },
      });
    }
  };
  return (
    <DismissKeyboard>
      <Container>
        <TextInput
          placeholder="fullName"
          defaultValue={userData?.me?.fullName}
          returnKeyType="done"
          onChangeText={(text) => setValue("fullName", text)}
        />
      </Container>
    </DismissKeyboard>
  );
}
