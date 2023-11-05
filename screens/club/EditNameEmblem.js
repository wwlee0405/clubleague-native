import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_CLUB_MUTATION = gql`
  mutation editClub($id: Int!, $clubname: String, $emblem: Upload) {
    editClub(id: $id, clubname: $clubname, emblem: $emblem) {
      error
      id
      ok
    }
  }
`;
const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      clubname
      emblem
      clubLeader {
        id
      }
    }
  }
`;

const View = styled.View``;
const Container = styled.View`
   justify-content: center;
   align-items: center;
   flex: 1;
`;
const Emblem = styled.View`
   justify-content: center;
   align-items: center;
   width: 130px;
   height: 130px;
   border-radius: 65px;
`;
const EmblemImg = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
`;
const TextInput = styled.TextInput`
	padding: 10px;
	text-align: center;
	font-size: 20px;
`;

export default function EditNameEmblem({ route }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      clubname: data?.seeClub?.clubname,
    },
  });
  const updateEditClub = (cache, result) => {
    const { clubname } = getValues();
    const {
      data: {
        editClub: { ok, id },
      },
    } = result;
    

  };
  const [editClubMutation, { loading, error }] = useMutation(
    EDIT_CLUB_MUTATION, 
    {
      update: updateEditClub,
    }
  );
  useEffect(() => {
    register("clubname", {
      required: true,
    });
  }, [register]);
  useEffect(() => {
    if (route.params.emblem) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params.emblem]);

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
  const onValid = ({ clubname, clubArea }) => {
    const emblem = new ReactNativeFile({
      uri: route.params.emblem,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (loading) {
      return;
    }
    editClubMutation({
      variables: {
        id: route.params.clubId,
        clubname,
        emblem,
      },
    });
  };

  console.log(data?.seeClub);
  console.log(data?.seeClub?.id);
  console.log(data?.seeClub?.clubname);
  console.log(route?.params?.clubId);
  console.log(route);
  console.log(error);

  return (
    <DismissKeyboard>
      <Container style={{backgroundColor: colors.background}}>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadEmblem")}>
            {route.params.emblem ? (
              <EmblemImg resizeMode="contain" source={{ uri: route.params.emblem }} />
            ):(
              <EmblemImg resizeMode="contain" source={{ uri: data?.seeClub?.emblem }} />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
           placeholder="Input Club Name"
           defaultValue={data?.seeClub?.clubname}
           returnKeyType="done"
           placeholderTextColor={colors.placeholder}
           onChangeText={(text) => setValue("clubname", text)}
           style={{backgroundColor: colors.background, color: colors.text}}
         />

      </Container>
    </DismissKeyboard>
  );
}