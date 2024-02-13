import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../components/DismissKeyboard";
import { useTheme } from "@react-navigation/native";
import OutcluberItem from "../components/outcluber/OutcluberItem";

const SEARCH_PHOTOS = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
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
  width: ${(props) => props.width / 1.1}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Outcluber({ navigation }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(SEARCH_PHOTOS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
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
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Photo", {
          photoId: photo.id,
        })
      }
    >
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <OutcluberItem />
      </View>
    </DismissKeyboard>
  );
}
