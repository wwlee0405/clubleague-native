import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Pressable, ScrollView, Animated, FlatList } from "react-native";
import ScrollMatchHeader from "../components/match/ScrollMatchHeader";
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
      clubNumInMatch
    }
  }
  ${GAME_FRAGMENT}
`;

const HEADER_HEIGHT = 60;
const theme = {
  center: "center"
};
const ModalContent = styled.View`
  background-color: ${colors.grey01};
  margin-top: 110px;
  padding: 10px;
  width: 100px;
  border-radius: 10px;
`;
const ModalWrapper = styled.View`
  flex-direction: row;
`;

export default function Match({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });
  const renderMatch = ({ item: match }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("GameMatch", {
            matchId: match.id,
            username: match.user?.username,
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

        <ScrollMatchHeader  />
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
