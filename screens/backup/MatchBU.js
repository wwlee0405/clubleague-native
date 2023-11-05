import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import { themeColors } from "../../themeColors";
import {SafeAreaView, View, Text, TouchableOpacity, Modal, Alert, Pressable, TouchableWithoutFeedback, ScrollView, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import ScrollHeader from "../components/ScrollHeader";

const HEADER_HEIGHT = 60;
const ModalContent = styled.View`
  background-color: ${themeColors.white};
  margin: 50px;
  padding: 10px;
  border-radius: 8px;
  left: 150px;
`;

const ModalBG = styled.View`
  flex: 1;
`;

export default function Match({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });
  const [modalVisible, setModalVisible] = useState(false);
  const MatchsButton = () => (
    <View style={{ flexDirection: "row" }}>
      <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      >
        <ModalContent>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <FontAwesome name="plus-square-o" color="#2e8b57" size={25} />
          </Pressable>
          <Text>bla</Text>
          <Text>sgg</Text>
        </ModalContent>
      </Modal>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus-square-o" color="#2e8b57" size={25} />
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MatchsButton,
    });
  }, []);
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position:"absolute",
          top:0,
          right:0,
          left: 0,
          elevation: 4,
          zIndex: 10,
        }}
      >

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <Pressable style={{flex:1}} onPress={() => setModalVisible(!modalVisible)}>
              <ModalContent>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesome name="plus-square-o" color="#2e8b57" size={25} />
                </Pressable>
                <Text>Game</Text>
                <Text>Foreign</Text>
              </ModalContent>
            </Pressable>

        </Modal>
        <ScrollHeader onPress={() => setModalVisible(true)} username={"messi"} iconName={"plus"} />
      </Animated.View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: { y: scrollY }}}],
          {useNativeDriver: false}
        )}
      >
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Pressable onPress={() => setModalVisible(false)}>
          <FontAwesome name="plus-square-o" color="#2e8b57" size={25} />
        </Pressable>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
