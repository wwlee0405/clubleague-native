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

const HEADER_HEIGHT = 60;

export default function Match({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const translateY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT]
  });
  const renderMatch = ({ item: match }) => {
    const logPress = (pressType) => {
      console.log(pressType);
    };
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("GameMatch", {
            matchId: match.id,
            username: match.user?.username,
          })
        }
        onPressIn={() => logPress("onPressIn")}
        onLongPress={() => logPress("onLongPress")}
        onPressOut={() => logPress("onPressOut")}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
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
    <ScreenLayout loading={loading}>
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
        style={{ width: "100%", marginTop: 60 }}
        showsVerticalScrollIndicator={false}
        data={data?.seeMatch}
        keyExtractor={(match) => "" + match.id}
        renderItem={renderMatch}
      />
    </ScreenLayout>
  )
}
