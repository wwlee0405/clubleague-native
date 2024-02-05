import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import SelectAvatarPhoto from "../screens/profile/SelectAvatarPhoto";
import TakeAvatarPhoto from "../screens/profile/TakeAvatarPhoto";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadAvatarNav({ route }) {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background },
        activeTintColor: colors.text,
        tabBarIndicatorStyle: {
          backgroundColor: "yellow",
          bottom: 0,
        },
      }}
    >
      <Tab.Screen name="Gallery">
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
              name="gallery"
              options={{ title: "Choose a photo" }}
              component={SelectAvatarPhoto}
              initialParams={ route.params }
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Photo"
        component={TakeAvatarPhoto}
        initialParams={ route.params }
      />
    </Tab.Navigator>
  );
}
