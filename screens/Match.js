import { gql, useQuery } from "@apollo/client";
import React, { useState, useRef } from "react";
import { Pressable, Animated, FlatList } from "react-native";
import ScrollMatchHeader from "../components/match/ScrollMatchHeader";
import ScreenLayout from "../components/ScreenLayout";
import MatchItem from "../components/match/MatchItem";
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
      homeGame {
        ...GameFragment
      }
      awayGame {
        ...GameFragment
      }
      file
    }
  }
  ${GAME_FRAGMENT}
`;

export default function Match({ navigation }) {
  const HEADER_HEIGHT = 60;
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp'
  });
  const renderMatch = ({ item: feed }) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("GameFeed", {
            matchId: feed.id,
            username: feed.user?.username,
          })
        }
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <MatchItem {...feed} />
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
    <ScreenLayout loading={loading}>
      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position: "absolute",
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
        contentContainerStyle={{ width: "100%", paddingTop: HEADER_HEIGHT }}
        showsVerticalScrollIndicator={false}
        data={data?.seeMatch}
        keyExtractor={(feed) => "" + feed.id}
        renderItem={renderMatch}
      />
    </ScreenLayout>
  )
}
