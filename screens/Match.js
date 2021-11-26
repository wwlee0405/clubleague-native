import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components"
import { colors } from "../colors";
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Pressable, ScrollView, Animated } from "react-native";
import ScrollHeader from "../components/ScrollHeader";
import { FontAwesome } from "@expo/vector-icons";

const HEADER_HEIGHT = 60;
const ModalContent = styled.View`
  background-color: ${colors.white};
  margin: 50px;
  padding: 10px;
  border-radius: 8px;
  left: 150px;
`;

export default function Match({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 10,
        }}
      >
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <Pressable style={{ flex:1, backgroundColor: 'transparent' }} onPress={() => setModalVisible(!modalVisible)}>
            <ModalContent>
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
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
        <Text style={{ paddingTop: 150 }}>Match</Text>
      </ScrollView>
    </SafeAreaView>
  )
}
