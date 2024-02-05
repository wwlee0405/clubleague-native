import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { useTheme } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.symbolColor,
        tabBarInactiveTintColor: colors.subText,
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: colors.background,
        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="match"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"tv"} color={color} focused={focused} />
          ),
          tabBarBadge: 5,
        }}
      >
        {() => <SharedStackNav screenName="Match" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="camera"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"camera"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="me"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 20,
                  ...(focused && { borderColor: colors.symbolColor, borderWidth: 2 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
