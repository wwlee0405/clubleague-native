import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Photo from "../../components/Photo";
import ScreenLayout from "../../components/ScreenLayout";
import HomeLayout from "../../components/home/HomeLayout";
import MyClubList from "../../components/home/MyClubList";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../../fragments";
import useMe, { ME_QUERY } from "../../hooks/useMe";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      ...PhotoFragment
      user {
        id
        username
        avatar
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

const theme = {
  center: "center"
};
const ClubText = styled.Text`
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
  return (
    <ScreenLayout theme={theme} loading={loading}>
      <View style={{ paddingVertical: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewClub")}
        >
          <ClubText>New Club</ClubText>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
        data={meData?.me?.userMember}
        keyExtractor={(myClubs) => "" + myClubs.id}
        renderItem={renderMyClubs}
      />
      <ClubText>feedback: you have to delete flex 1</ClubText>
    </ScreenLayout>
  );
}
