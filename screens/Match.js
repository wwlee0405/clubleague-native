import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Pressable, ScrollView, Animated, FlatList } from "react-native";
import ScrollMatchHeader from "../components/ScrollMatchHeader";
import ScreenLayout from "../components/ScreenLayout";
import { FontAwesome } from "@expo/vector-icons";
import MatchItem from "../components/match/MatchItem";
import ScrollFeedHeader from "../components/ScrollFeedHeader";
import { GAME_FRAGMENT } from "../fragments";

const MATCH_QUERY = gql`
  query seeMatch($offset: Int!) {
    seeMatch(offset: $offset) {
      id
      user {
        id
        username
        avatar
      }
      games {
        ...GameFragment
      }
      file
      clubsInGame
    }
  }
  ${GAME_FRAGMENT}
`;

const HEADER_HEIGHT = 60;
const theme = {
  center: "center"
};
const ModalContent = styled.View`
  background-color: ${colors.white};
  margin: 60px;
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
  const renderMatch = ({ item: match }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("GameMatch", {
            matchId: match.id,
          })
        }
      >
        <MatchItem {...match} />
      </Pressable>
    );
  };
  const { data, loading, refetch, fetchMore } = useQuery(MATCH_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout theme={theme} loading={loading}>
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
          <Pressable style={{ flex:1 }} onPress={() => setModalVisible(!modalVisible)}>
            <ModalContent>
              <Pressable onPress={() => navigation.navigate("NewMatch")}>
                <Text>Game</Text>
              </Pressable>
              <Text>Foreign</Text>
            </ModalContent>
          </Pressable>
        </Modal>
        <ScrollMatchHeader onPress={() => setModalVisible(true)} username={"messi"} iconName={"plus"} />
      </Animated.View>
      <FlatList
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: { contentOffset: { y: scrollY }}}],
          {useNativeDriver: false}
        )}
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeMatch?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeMatch}
        keyExtractor={(match) => "" + match.id}
        renderItem={renderMatch}
      />
    </ScreenLayout>
  )
}
