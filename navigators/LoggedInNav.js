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
import SelectClub from "../screens/match/SelectClub";
import Entry from "../screens/match/Entry";
import Comments from "../screens/match/Comments";
import NewMatch from "../screens/match/NewMatch";
import SelectAway from "../screens/match/SelectAway";

import Clubhouse from "../screens/club/Clubhouse";
import ClubCalendar from "../screens/club/ClubCalendar";
import ClubMember from "../screens/club/ClubMember";
import ClubSetting from "../screens/club/ClubSetting";

import WritingAuth from "../screens/club/WritingAuth";
import InvitingAuth from "../screens/club/InvitingAuth";
import AppointBoard from "../screens/club/AppointBoard";
import UnappointBoard from "../screens/club/UnappointBoard";
import TransferLeader from "../screens/club/TransferLeader";

import Profile from "../screens/profile/Profile";
import EditProfile from "../screens/profile/EditProfile";
import SelectAvatarPhoto from "../screens/profile/SelectAvatarPhoto";
import TakeAvatarPhoto from "../screens/profile/TakeAvatarPhoto";
import UploadAvatarForm from "../screens/profile/UploadAvatarForm";

import SelectEmblemPhoto from "../screens/home/SelectEmblemPhoto";
import TakeEmblemPhoto from "../screens/home/TakeEmblemPhoto";
import UploadEmblemForm from "../screens/home/UploadEmblemForm";

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
      <Stack.Screen name="Clubhouse"
        options={{
          headerTitle: "clubname"
        }}
      >
        { (props) => (
          <MaterialTab.Navigator
            tabBarOptions={{
              scrollEnabled : true,
              style: { backgroundColor: "white" },
              tabStyle: { width: 100 },
              labelStyle: { fontSize: 10 },
              inactiveTintColor: "black",
              activeTintColor: "#2e8b57",
              indicatorStyle: {
                backgroundColor: "#2e8b57",
                bottom: 0,
              },
            }}
          >
            <MaterialTab.Screen
              name="Home"
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
            <MaterialTab.Screen
              name="Setting"
              component={ClubSetting}
              initialParams={ props.route.params }
            />
          </MaterialTab.Navigator>
        )}
      </Stack.Screen>

      <Stack.Screen name="WritingAuth" component={WritingAuth} />
      <Stack.Screen name="InvitingAuth" component={InvitingAuth} />
      <Stack.Screen name="AppointBoard" component={AppointBoard} />
      <Stack.Screen name="UnappointBoard" component={UnappointBoard} />
      <Stack.Screen name="TransferLeader" component={TransferLeader} />

      <Stack.Screen name="GameMatch" component={GameMatch} />
      <Stack.Screen name="SelectClub" component={SelectClub} />
      <Stack.Screen name="Entry" component={Entry} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="NewMatch" component={NewMatch} />
      <Stack.Screen name="SelectAway" component={SelectAway} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />

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
            <MaterialTab.Screen name="Gallery">
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
                    name="Gallery"
                    options={{ title: "Choose a photo" }}
                    component={SelectAvatarPhoto}
                    initialParams={ props.route.params }
                  />
                </Stack.Navigator>
              )}
            </MaterialTab.Screen>

            <MaterialTab.Screen
              name="Photo"
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
