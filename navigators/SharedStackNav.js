import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import Photo from "../screens/Photo";
import Feed from "../screens/home/Feed";
import Match from "../screens/Match";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Me from "../screens/Me";
import NewClub from "../screens/home/NewClub";
import SearchClub from "../screens/home/SearchClub";
import GameMatch from "../screens/match/GameMatch";
import NewMatch from "../screens/match/NewMatch";
import SelectClub from "../screens/match/SelectClub";
import SelectAway from "../screens/match/SelectAway";
import Entry from "../screens/match/Entry";
import Likes from "../screens/Likes";
import Profile from "../screens/profile/Profile";
import EditProfile from "../screens/profile/EditProfile";
import Comments from "../screens/match/Comments";
import ClubEx from "../screens/ClubEx";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native";
import { isLoggedInVar, logUserOut } from "../apollo";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Clubhouse from "../screens/home/Clubhouse";
import ClubCalendar from "../screens/home/ClubCalendar";
import Clubhouse3 from "../screens/home/Clubhouse3";
import ClubNav from "./ClubNav";

const Stack = createStackNavigator();
const MaterialTab = createMaterialTopTabNavigator();



export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "black",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: colors.white,
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
      {screenName === "Search" ? (
        <Stack.Screen name={"Search"} component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name={"Notifications"} component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name={"Me"} component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="ClubEx" component={ClubEx} />
      <Stack.Screen name="GameMatch" component={GameMatch} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="NewClub" component={NewClub} />
      <Stack.Screen name="SelectClub" component={SelectClub} />
      <Stack.Screen name="SelectAway" component={SelectAway} />
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="SearchClub" component={SearchClub} />
      <Stack.Screen name="NewMatch" component={NewMatch} />

      <Stack.Screen name="Clubhouse">
        { (props) => (
          <MaterialTab.Navigator>
            <MaterialTab.Screen
              name="ClubHome"
              component={Clubhouse}
              initialParams={ props.route.params }
            />
            <MaterialTab.Screen
              name="Calendar"
              component={ClubCalendar}
              initialParams={ props.route.params }
            />
          </MaterialTab.Navigator>
        )}
      </Stack.Screen>

    </Stack.Navigator>
  );
}
