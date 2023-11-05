import React, { useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import useMe from "../hooks/useMe";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../hooks/AppContext";

export default function Me({ navigation }) {
  const { colors } = useTheme();
  const { isDarkTheme, setIsDarkTheme } = React.useContext(AppContext);
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.text }}>Me</Text>
      <TouchableOpacity 
        style={{ color: colors.text, backgroundColor: colors.primary, width: 80, height: 80 }}
        onPress={() => setIsDarkTheme(curent => !curent)}
      >
        <Text style={{ color: colors.text }}>{ isDarkTheme ? 'switch to light' : 'switch to dark' }</Text>
      </TouchableOpacity>
    </View>
  );
}
