import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Photo from "../screens/Photo";
import Feed from "../screens/home/Feed";
import Match from "../screens/Match";
import Outcluber from "../screens/Outcluber";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import NewClub from "../screens/home/NewClub";
import SearchClub from "../screens/home/SearchClub";
import Likes from "../screens/Likes";
import { TouchableOpacity } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useTheme } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerBackTitleVisible: false,
        headerTintColor: colors.text,
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: colors.background,
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"Feed"}
          component={Feed}
          options={{
            headerTitle: () => (

              <TouchableOpacity onPress={() => logUserOut()}>
                <Image
                  style={{
                    width: 120,
                    height: 40,
                  }}
                  resizeMode="contain"
                  source={require("../assets/logo.png")}
                />
              </TouchableOpacity>
            ),
          }}
        />
      ) : null}
      {screenName === "Match" ? (
        <Stack.Screen name={"Match"} component={Match} options={{ headerShown: true }} />
      ) : null}
      {screenName === "Outcluber" ? (
        <Stack.Screen name={"Outcluber"} component={Outcluber} options={{ headerShown: true }} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}

      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="NewClub" component={NewClub} />
      <Stack.Screen name="SearchClub" component={SearchClub} />
    </Stack.Navigator>
  );
}
