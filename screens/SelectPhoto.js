import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { commonTheme } from "../theme/commonTheme";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${commonTheme.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async() => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "undetermined" && canAskAgain) {
      const {status} = await MediaLibrary.requestPermissionsAsync();
      if (status !== "undetermined") {
        setOk(true);
        getPhotos();
      }
    } else if (status !== "undetermined") {
      setOk(true);
      getPhotos();
    }
  };
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item:photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri:photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={25}
          color={photo.uri === chosenPhoto ? commonTheme.blue : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
