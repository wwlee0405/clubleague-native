import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from "react-native";
import DismissKeyboard from "../../components/DismissKeyboard";
import styled from "styled-components/native";
import { themeColors } from "../../themeColors";

const CREATE_GAME_MUTATION = gql`
  mutation createGame($clubId: Int!, $file: String, $caption: String) {
    createGame(clubId: $clubId, file: $file, caption: $caption) {
      id
      ok
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
`;
const CaptionContainer = styled.View`
  margin-top: 10px;
`;
const Caption = styled.TextInput`
  background-color: ${themeColors.white};
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;
const LabelText = styled.Text`
  font-size: 15px;
  color: ${themeColors.yellow};
`;
const SubmitText = styled.Text`
  font-size: 20px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
`;
const BtnRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  margin-left: 50px;
  background-color: ${themeColors.greyColor};
`;
const UpDownBtn = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${themeColors.blue};
`;
const BtnText = styled.Text`
  color: ${themeColors.white};
  align-items: center;
`;
const HeaderRightText = styled.Text`
color: ${themeColors.blue};
font-size: 16px;
font-weight: 600;
margin-right: 7px;
`;

export default function NewMatch({ navigation, route }) {

  const updateCreateGame = (cache, result) => {
    const {
      data: { createGame },
    } = result;
    if (createGame.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeMatch(prev) {
            return [createGame, ...prev];
          },
        },
      });
      navigation.navigate("Match");
    }
  };
  const [createGameMutation, { loading }] = useMutation(
    CREATE_GAME_MUTATION,
    {
      update: updateCreateGame,
    }
  );

  React.useEffect(() => {
    if (route.params?.homeClub) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.homeClub]);

  const [awayCount, setAwayCount] = useState(1);

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
    register("caption");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }) => {

    createGameMutation({
      variables: {
        clubId: route.params?.homeClub,
        caption,
        file,
      },
    });
  };

  console.log(route);

  return (
    <DismissKeyboard>
      <Container>
        <CaptionContainer>
          <Caption
            placeholder="If you make match, select match icon below."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setValue("caption", text)}
          />
        </CaptionContainer>
        <Text>Sports</Text>
        <Text>Date</Text>
        <Text>Time</Text>
        <Text>Location</Text>
        <Pressable onPress={() => navigation.navigate("SelectClub")}>
          <LabelText>Home</LabelText>
          <SubmitText>{{ clubId: route.params?.homeClub }}</SubmitText>
        </Pressable>
        <LabelText>Away</LabelText>
        <Row>
          <SubmitText>{awayCount}</SubmitText>
          <BtnRow>
            <TouchableOpacity onPress={() => setAwayCount(awayCount + 1)}>
              <UpDownBtn>
                <BtnText>+</BtnText>
              </UpDownBtn>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAwayCount(awayCount - 1)}>
              <UpDownBtn>
                <BtnText>-</BtnText>
              </UpDownBtn>
            </TouchableOpacity>
          </BtnRow>
        </Row>
        <Text>요청받을 클럽의 개수를 정하시오.</Text>
      </Container>
    </DismissKeyboard>
  )
}
