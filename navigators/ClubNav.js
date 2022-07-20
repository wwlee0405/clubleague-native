import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Clubhouse from "../screens/home/Clubhouse";
import Clubhouse2 from "../screens/home/Clubhouse2";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function ClubNav() {
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
      <Tab.Screen name="Home">
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
              name="Home"
              options={{ title: "Choose a photo" }}
              component={Clubhouse}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Calender" component={Clubhouse2} />
    </Tab.Navigator>
  );
}
