import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { TextInput } from "../../components/auth/AuthShared";
import DismissKeyboard from "../../components/DismissKeyboard";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($username: String) {
    editProfile(username: $username) {
      error
      id
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  padding: 10px 20px;
`;

export default function EditUsername({ navigation, route }) {
  const { data: userData } = useMe();
  const { colors } = useTheme();
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
      username: userData?.me?.username,
    }
  });
  useEffect(() => {
    register("username", {
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
  const onValid = ({ username }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          username,
        },
      });
    }
  };
  return (
    <DismissKeyboard>
      <Container style={{ backgroundColor: colors.background }}>
        <TextInput
          placeholder="username"
          defaultValue={userData?.me?.username}
          returnKeyType="done"
          onChangeText={(text) => setValue("username", text)}
        />
      </Container>
    </DismissKeyboard>
  );
}
