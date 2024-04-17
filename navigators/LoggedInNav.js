import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import TabsNav from "./TabsNav";
import ClubNav from "./ClubNav";
import UploadAvatarNav from "./UploadAvatarNav";
import UploadAvatarForm from "../screens/profile/UploadAvatarForm";

import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import MessagesNav from "./MessagesNav";

import GameFeed from "../screens/match/GameFeed";
import OutcluberFeed from "../screens/outcluber/OutcluberFeed"
import SelectClub from "../screens/match/SelectClub";
import SelectLocation from "../screens/match/SelectLocation";
import Entry from "../screens/match/Entry";
import Comments from "../screens/match/Comments";
import NewMatch from "../screens/match/NewMatch";
import SelectAway from "../screens/match/SelectAway";

import EditNameEmblem from "../screens/club/EditNameEmblem";
import MemberAuth from "../screens/club/MemberAuth";
import AppointBoard from "../screens/club/AppointBoard";
import UnappointBoard from "../screens/club/UnappointBoard";
import TransferLeader from "../screens/club/TransferLeader";

import Profile from "../screens/profile/Profile";
import EditProfile from "../screens/profile/EditProfile";
import EditUsername from "../screens/profile/EditUsername";
import EditName from "../screens/profile/EditName";
import EditBio from "../screens/profile/EditBio";

import SelectEmblemPhoto from "../screens/home/SelectEmblemPhoto";
import TakeEmblemPhoto from "../screens/home/TakeEmblemPhoto";
import UploadEmblemForm from "../screens/home/UploadEmblemForm";

const Stack = createStackNavigator();
const MaterialTab = createMaterialTopTabNavigator();

export default function LoggedInNav() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerMode: 'screen',
        headerTintColor: colors.text,
        headerStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Clubhouse"
        component={ClubNav}
        options={{
          headerTitle: "clubname"
        }}
      />

      <Stack.Screen name="EditNameEmblem" component={EditNameEmblem} />
      <Stack.Screen name="MemberAuth" component={MemberAuth} />
      <Stack.Screen name="AppointBoard" component={AppointBoard} />
      <Stack.Screen name="UnappointBoard" component={UnappointBoard} />
      <Stack.Screen name="TransferLeader" component={TransferLeader} />

      <Stack.Screen name="GameFeed" component={GameFeed} />
      <Stack.Screen name="OutcluberFeed" component={OutcluberFeed} />
      <Stack.Screen name="SelectClub" component={SelectClub} />
      <Stack.Screen name="SelectLocation" component={SelectLocation} />
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="NewMatch" component={NewMatch} />
      <Stack.Screen name="SelectAway" component={SelectAway} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditUsername" component={EditUsername} />
      <Stack.Screen name="EditName" component={EditName} />
      <Stack.Screen name="EditBio" component={EditBio} />
      
      <Stack.Screen 
        name="UploadAvatar"
        component={UploadAvatarNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UploadAvatarForm"
        component={UploadAvatarForm}
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "UploadAvatar",
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
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
          headerTintColor: colors.text,
          headerStyle: {
            backgroundColor: colors.background,
          },
        }}
      />
      <Stack.Screen
        name="Messages"
        component={MessagesNav}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UploadEmblem"
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
            <MaterialTab.Screen name="Gallery">
              {() => (
                <Stack.Navigator
                  screenOptions={{
                    headerTintColor: colors.text,
                    headerBackTitleVisible: false,
                    headerBackImage: ({ tintColor }) => (
                      <Ionicons color={tintColor} name="close" size={28} />
                    ),
                    headerStyle: {
                      backgroundColor: colors.background,
                      shadowOpacity: 0.3,
                    },
                  }}
                >
                  <Stack.Screen
                    name="Gallery"
                    options={{ title: "Choose a photo" }}
                    component={SelectEmblemPhoto}
                    initialParams={ props.route.params }
                  />
                </Stack.Navigator>
              )}
            </MaterialTab.Screen>

            <MaterialTab.Screen
              name="Photo"
              component={TakeEmblemPhoto}
              initialParams={ props.route.params }
            />
          </MaterialTab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
