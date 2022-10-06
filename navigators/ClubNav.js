//수정 혹은 삭제 예정

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Clubhouse from "../screens/home/Clubhouse";
import ClubCalendar from "../screens/home/ClubCalendar";
import Clubhouse3 from "../screens/home/Clubhouse3";

import { gql, useMutation, useQuery } from "@apollo/client";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function ClubNav({ route, clubId }) {

  return (
    <Tab.Navigator
      tabBarPosition="top"
      tabBarOptions={{
        style: {
          backgroundColor: "black",
        },
        activeTintColor: "white",
        indicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="ClubHome">
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
              name="ClubHome"
              options={{ title: "Choose a photo" }}
              component={ClubCalendar}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Calender" component={Clubhouse3} />
    </Tab.Navigator>
  );
}
