import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { commonTheme } from "../../theme/commonTheme";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../DismissKeyboard";
import HeaderRightLoading from "../shared/HeaderRightLoading";
import HeaderRight from "../shared/HeaderRight";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($matchId: Int!, $payload: String!) {
    createComment(matchId: $matchId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const EDIT_CLUB_MUTATION = gql`
  mutation editClub($id: Int!, $emblem: Upload) {
    editClub(id: $id, emblem: $emblem) {
      error
      id
      ok
    }
  }
`;

const View = styled.View``;
const Container = styled.View`
   justify-content: center;
   align-items: center;
   flex: 1;
   background-color: ${commonTheme.white};
`;
const Emblem = styled.View`
   justify-content: center;
   align-items: center;
   width: 130px;
   height: 130px;
   border-radius: 65px;
   background-color: ${commonTheme.seaGreen};
`;
const EmblemImg = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
`;
const TextInput = styled.TextInput`
	padding: 10px;
	background-color: ${commonTheme.white};
	text-align: center;
	font-size: 20px;
`;

function ClubEditEmblem({ id, defaultValue, beforeEmblem, editEmblem, refresh }) {
  const navigation = useNavigation();
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

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
    if (editEmblem) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [editEmblem]);

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
      uri: editEmblem,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (!loading) {
      editClubMutation({
        variables: {
          id,
         
          emblem,
        },
      });
    }
  };

  return (
    <DismissKeyboard>
      <Container>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadEmblem")}>
            {editEmblem ? (
              <EmblemImg resizeMode="contain" source={{ uri: editEmblem }} />
            ):(
              <EmblemImg resizeMode="contain" source={{ uri: beforeEmblem }} />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
           placeholder="Input Club Name"
           defaultValue={defaultValue}
           returnKeyType="done"
           placeholderTextColor={"#c7c7c7"}
           onChangeText={(text) => setValue("clubname", text)}
         />

      </Container>

    </DismissKeyboard>
  );
}

ClubEditEmblem.propTypes = {
  
};

export default ClubEditEmblem;
