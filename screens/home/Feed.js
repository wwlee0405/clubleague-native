import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import ScreenLayout from "../../components/ScreenLayout";
import MyClubList from "../../components/home/MyClubList";
import MySchedItem from "../../components/home/MySchedItem";
import { GAME_FRAGMENT, COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../../fragments";
import useMe, { ME_QUERY } from "../../hooks/useMe";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        username
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const SEE_MY_SCHED = gql`
  query seeMySched($offset: Int!) {
    seeMySched(offset: $offset) {
      ...GameFragment
      match {
        id
      }
      entries {
        id
        user {
          username
          avatar
        }
      }
      createdAt
      entryNumber
      isEntry
    }
  }
  ${GAME_FRAGMENT}
`

const theme = {
  center: "center"
};
const Text = styled.Text`
  font-weight: bold;
	font-size: 18px;
`;

export default function Feed({ navigation, route }) {
  const { data: meData, loading } = useMe();
  const renderMyClubs = ({ item: myClubs }) => {
    return <MyClubList {...myClubs} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const { data, refetch, fetchMore } = useQuery(SEE_MY_SCHED, {
    variables: {
      offset: 0,
    },
  });
  const renderSched = ({ item: sched }) => {
    return <MySchedItem {...sched} />;
  };
  const MessagesButton = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("Messages")}
      >
        <Ionicons name="paper-plane" color="#2e8b57" size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("SearchClub")}
      >
        <Ionicons name="search" color="#2e8b57" size={25} />
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  console.log(data?.seeMySched)
  return (
    <ScreenLayout loading={loading}>
      <View style={{ paddingVertical: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewClub")}
        >
          <Text>New Club</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={refresh}
          data={meData?.me?.userMember}
          keyExtractor={(myClubs) => "" + myClubs.id}
          renderItem={renderMyClubs}
        />
      </View>

      <Text>My Scheule</Text>
      <FlatList
        data={data?.seeMySched}
        keyExtractor={(sched) => "" + sched.id}
        renderItem={renderSched}
      />
    </ScreenLayout>
  );
}
