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
import { commonTheme } from "../../theme/commonTheme";
import { FEED_MATCH } from "../../fragments";

const CREATE_GAME_MUTATION = gql`
  mutation createGame($clubId: Int!, $file: String, $caption: String) {
    createGame(clubId: $clubId, file: $file, caption: $caption) {
      ...FeedMatch
    }
  }
  ${FEED_MATCH}
`;

const Container = styled.View`
  flex: 1;
  padding: 0px 20px;
`;
const CaptionContainer = styled.View`
  margin-top: 10px;
`;
const Caption = styled.TextInput`
  background-color: ${commonTheme.white};
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;
const LabelText = styled.Text`
  font-size: 15px;
  color: ${commonTheme.yellow};
`;
const Emblem = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const SubmitText = styled.Text`
  padding-left: 10px;
  font-size: 15px;
  font-weight: bold;
`;
const Row = styled.View`
  flex-direction: row;
  width: 260px;
  height: 50px;
  align-items: center;
`;
const BtnRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 70px;
  margin-left: 50px;
  background-color: ${commonTheme.greyColor};
`;
const UpDownBtn = styled.View`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${commonTheme.blue};
`;
const BtnText = styled.Text`
  color: ${commonTheme.white};
  align-items: center;
`;
const HeaderRightText = styled.Text`
color: ${commonTheme.blue};
font-size: 16px;
font-weight: 600;
margin-right: 7px;
`;

export default function NewMatch({ navigation, route }) {


  const [createGameMutation, { loading, error }] = useMutation(
    CREATE_GAME_MUTATION,

  );

  React.useEffect(() => {
    if (route.params?.clubId, route.params?.clubname) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
      handleSubmit(onValid);

    }
  }, [route.params?.clubId, route.params?.clubname]);

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

  const onValid = ({ file, caption }) => {

    createGameMutation({
      variables: {
        clubId: route.params?.clubId,
        caption,
        file,
      },
    });
  };

  console.log(route.params?.id);
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
          {route.params?.clubname ? (
            <Row>
              {route.params?.emblem ? (
                <Emblem resizeMode="contain" source={{ uri: route.params.emblem }} />
              ) : (
                <Emblem resizeMode="contain" source={require('../../data/2bar.jpg')} />
              )}
              <SubmitText>{route.params?.clubname}</SubmitText>
            </Row>  
          ) : null}
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
