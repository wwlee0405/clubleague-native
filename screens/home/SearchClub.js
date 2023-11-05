import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import SearchedClub from "../../components/home/SearchedClub";
import { useTheme } from "@react-navigation/native";

const SEARCH_CLUBS = gql`
  query searchClubs($keyword: String!) {
    searchClubs(keyword: $keyword) {
      id
      clubname
      clubArea
      totalMember
      clubLeader{
        username
      }
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  font-weight: 600;
`;
const Input = styled.TextInput`
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function SearchClub({ navigation }) {
  const { colors } = useTheme();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_CLUBS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      backgroundColor={colors.buttonBackground}
      color={colors.text}
      placeholderTextColor={colors.placeholder}
      placeholder="Search clubs"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);
  console.log(data);


  const renderItem = ({ item: club }) => (
    <Pressable
      onPress={() =>
        navigation.navigate("Clubhouse", {
          clubId: club.id,
        })
      }
    >
      <SearchedClub {...club} />
    </Pressable>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText style={{ flex: 1, color: colors.text }}>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText style={{ flex: 1, color: colors.text }}>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchClubs !== undefined ? (
          data?.searchClubs?.length === 0 ? (
            <MessageContainer>
              <MessageText style={{ flex: 1, color: colors.text }}>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data?.searchClubs}
              keyExtractor={(club) => "" + club.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}
