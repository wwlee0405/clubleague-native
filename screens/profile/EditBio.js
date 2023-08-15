import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { TextInput } from "../../components/auth/AuthShared";
import DismissKeyboard from "../../components/DismissKeyboard";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($bio: String) {
    editProfile(bio: $bio) {
      error
      id
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: 10px 20px;
`;

export default function EditBio({ navigation }) {
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
      bio: userData?.me?.bio,
    }
  });
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
  const onValid = ({ bio }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          bio,
        },
      });
    }
  };
  return (
    <DismissKeyboard>
      <Container>
        <TextInput
          placeholder="bio"
          defaultValue={userData?.me?.bio}
          returnKeyType="done"
          onChangeText={(text) => setValue("bio", text)}
        />
      </Container>
    </DismissKeyboard>
  );
}
