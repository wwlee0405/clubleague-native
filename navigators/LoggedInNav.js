import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabsNav from "./TabsNav";
import ClubNav from "./ClubNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";

import GameMatch from "../screens/match/GameMatch";
import Entry from "../screens/match/Entry";
import Comments from "../screens/match/Comments";
import NewMatch from "../screens/match/NewMatch";
import SelectAway from "../screens/match/SelectAway";

import Clubhouse from "../screens/home/Clubhouse";
import ClubCalendar from "../screens/home/ClubCalendar";
import ClubMember from "../screens/home/ClubMember";
import Profile from "../screens/profile/Profile";
import SelectAvatarPhoto from "../screens/profile/SelectAvatarPhoto";
import TakeAvatarPhoto from "../screens/profile/TakeAvatarPhoto";
import UploadAvatarForm from "../screens/profile/UploadAvatarForm";

const Stack = createStackNavigator();
const MaterialTab = createMaterialTopTabNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{ headerShown: false }}
      />
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
            <MaterialTab.Screen
              name="Member"
              component={ClubMember}
              initialParams={ props.route.params }
            />
          </MaterialTab.Navigator>
        )}
      </Stack.Screen>

      <Stack.Screen name="GameMatch" component={GameMatch} />
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="NewMatch" component={NewMatch} />
      <Stack.Screen name="SelectAway" component={SelectAway} />
      <Stack.Screen name="Profile" component={Profile} />

      <Stack.Screen
        name="UploadAvatar"
        options={{ headerShown: false }}
      >
        { (props) => (
          <MaterialTab.Navigator
            tabBarPosition="bottom"
            tabBarOptions={{
              style: {
                backgroundColor: "black",
              },
              activeTintColor: "white",
              indicatorStyle: {
                backgroundColor: "yellow",
                bottom: 0,
              },
            }}
          >
            <MaterialTab.Screen name="SelectAvatarPhoto">
              {() => (
                <Stack.Navigator
                  screenOptions={{
                    headerTintColor: "white",
                    headerBackTitleVisible: false,
                    headerBackImage: ({ tintColor }) => (
                      <Ionicons color={tintColor} name="close" size={28} />
                    ),
                    headerStyle: {
                      backgroundColor: "black",
                      shadowOpacity: 0.3,
                    },
                  }}
                >
                  <Stack.Screen
                    name="SelectAvatarPhoto"
                    options={{ title: "Choose a photo" }}
                    component={SelectAvatarPhoto}
                    initialParams={ props.route.params }
                  />
                </Stack.Navigator>
              )}
            </MaterialTab.Screen>

            <MaterialTab.Screen
              name="TakeAvatarPhoto"
              component={TakeAvatarPhoto}
              initialParams={ props.route.params }
            />
          </MaterialTab.Navigator>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="UploadAvatarForm"
        component={UploadAvatarForm}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "UploadAvatar",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
      <Stack.Screen
        name="Upload"
        component={UploadNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadForm"
        component={UploadForm}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
