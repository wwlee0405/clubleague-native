import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import Clubhouse from "../screens/club/Clubhouse";
import ClubCalendar from "../screens/club/ClubCalendar";
import ClubMember from "../screens/club/ClubMember";
import ClubSetting from "../screens/club/ClubSetting";

const MaterialTopTab = createMaterialTopTabNavigator();

export default function ClubNav({ route, clubId }) {
  const { colors } = useTheme();
  return (
    <MaterialTopTab.Navigator
      screenOptions={{
        tabBarScrollEnabled : true,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarItemStyle: { width: 100 },
        tabBarLabelStyle: { fontSize: 10 },
        tabBarInactiveTintColor: colors.text,
        tabBarActiveTintColor: colors.symbolColor,
        tabBarIndicatorStyle: {
          backgroundColor: colors.symbolColor,
          bottom: 0,
        },
      }}
    >
      <MaterialTopTab.Screen 
        name="home"
        component={Clubhouse}
        initialParams={ route.params }
       />
       <MaterialTopTab.Screen
        name="Calendar"
        component={ClubCalendar}
        initialParams={ route.params }
      />
      <MaterialTopTab.Screen
        name="Member"
        component={ClubMember}
        initialParams={ route.params }
      />
      <MaterialTopTab.Screen
        name="Setting"
        component={ClubSetting}
        initialParams={ route.params }
      />
    </MaterialTopTab.Navigator>
  );
}
