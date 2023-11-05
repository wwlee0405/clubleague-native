import AppLoading from "expo-app-loading";
import React, { useState, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";

import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar, cache } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";

import { AppContext } from "./hooks/AppContext";
import DarkTheme from "./theme/DarkTheme";
import DefaultTheme from "./theme/DefaultTheme";

export default function App() {
  const [loading, setLoading] = useState(false);
  const onFinish = () => setLoading(true);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
      serialize: false,
    });
    return preloadAssets();
  };
  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const appContext = useMemo(() => {
    return {
      isDarkTheme,
      setIsDarkTheme
    }
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <AppContext.Provider value={appContext}>
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </AppContext.Provider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
