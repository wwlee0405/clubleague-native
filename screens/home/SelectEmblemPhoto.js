import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { commonTheme } from "../../theme/commonTheme";
import HeaderRight from "../../components/shared/HeaderRight";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.View`
  flex: 0.5;
  background-color: black;
`;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

export default function SelectEmblemPhoto({ navigation, route }) {
  const [denied, setDenied] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    if (denied) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      setPhotos(photos);
      setChosenPhoto(photos[0]?.uri);
    }
  };
  const getPermissions = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status !== "granted" && canAskAgain) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        setDenied(false);
        getPhotos();
      }
    } else if (status === "granted") {
      setDenied(false);
      getPhotos();
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          onPress={() =>
            navigation.navigate("EditNameEmblem", {
              emblem: chosenPhoto,
            })
          }
        />
      ),
    });
  }, [chosenPhoto]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <TouchableOpacity onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? commonTheme.blue : "white"}
        />
      </IconContainer>
    </TouchableOpacity>
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
  )
}
