import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useRef, useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import HeaderRightLoading from "../../components/shared/HeaderRightLoading";
import HeaderRight from "../../components/shared/HeaderRight";

const EDIT_CLUB_MUTATION = gql`
  mutation editClub($id: Int!, $clubname: String, $emblem: Upload) {
    editClub(id: $id, clubname: $clubname, emblem: $emblem) {
      error
      ok
      id
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
   background-color: ${colors.white};
`;
const Emblem = styled.View`
   justify-content: center;
   align-items: center;
   width: 130px;
   height: 130px;
   border-radius: 65px;
   background-color: ${colors.seaGreen};
`;
const EmblemImg = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 65px;
`;
const TextInput = styled.TextInput`
	padding: 10px;
	background-color: ${colors.white};
	text-align: center;
	font-size: 20px;
`;

export default function EditNameEmblem({ route, clubId }) {
  const navigation = useNavigation();
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      clubname: route.params?.clubname,
    },
  });
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route.params?.clubId,
    },
  });
  const updateEditClub = (cache, result) => {
    const {
      editClub: { ok, id },
    } = result;
    const { clubname } = getValues();
    if (ok) {
      /* cache*/
      navigation.navigate("Me");
    }

  };
  const [editClubMutation, { loading, error }] = useMutation(
    EDIT_CLUB_MUTATION, 
    {
      update: updateEditClub,
    }
  );
  const clubnameRef = useRef();

  const onValid = ({ clubname, clubArea }) => {
    const emblem = new ReactNativeFile({
      uri: route.params.emblem,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    if (!loading) {
      editClubMutation({
        variables: {
          clubname,
          emblem,
        },
      });
    }
  };
  useEffect(() => {
    register("clubname", );
  }, [register]);
  useEffect(() => {
    if (route.params?.emblem) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.emblem]);

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

  console.log(data.seeClub);
  console.log(data.seeClub?.id);
  console.log(route);
  console.log(error);

  return (
    <DismissKeyboard>
      <Container>
        <View style={{ paddingBottom: 30 }}>
          <TouchableOpacity onPress={() => navigation.navigate("UploadEmblem")}>
            {route.params?.emblem ? (
              <EmblemImg resizeMode="contain" source={{ uri: route.params.emblem }} />
            ):(
              <EmblemImg resizeMode="contain" source={{ uri: data.seeClub?.emblem }} />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
           ref={clubnameRef}
           placeholder="Input Club Name"
           defaultValue={data.seeClub?.clubname}
           returnKeyType="done"
           placeholderTextColor={"#c7c7c7"}
           onChangeText={(text) => setValue("clubname", text)}
         />

      </Container>
    </DismissKeyboard>
  );
}