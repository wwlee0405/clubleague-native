import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import styled from "styled-components"
import { colors } from "../colors";
import { useNavigation } from '@react-navigation/native';

const Container = styled.View``;

const ScrollHeader = ({
    onPress,
    username
  }) => {
  return (
    <View style={{
       // marginTop:Constant.statusBarHeight,
        height: 60,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
    }}>
      <View style={{ flexDirection:"row" }}>
        <View style={{
            paddingLeft: 15,
            paddingTop: 20,
            width: 70,
        }}>
          <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name="arrow-left" size={25} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{
              fontSize: 20,
              marginTop: 18,
              color: colors.black,
              fontWeight: "bold"
          }}>{username}</Text>
        </View>
      </View>
    </View>
  );
};


export default ScrollHeader;
