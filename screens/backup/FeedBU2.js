import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyClub from "../../components/home/MyClub";
import Photo from "../../components/Photo";
import MyClubLayout from "../../components/home/MyClubLayout";
import HomeLayout from "../../components/home/HomeLayout";
import ScreenLayout from "../../components/ScreenLayout";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../../fragments";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
      userLeader{
        id
        clubname
        emblem
      }
      userMember{
        club{
          id
          clubname
          emblem
        }
      }
    }
  }
`;

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

export default function Feed({ navigation }) {
  const { data, loading } = useQuery(ME_QUERY);
  console.log(data);
  const renderMe = ({ item }) => {
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: "balck" }}>{item.id}</Text>
        </View>
      );
    };
  const MessagesButton = () => (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("Messages")}
      >
        <Ionicons name="paper-plane" color="#2e8b57" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("MySearch")}
      >
        <Ionicons name="search" color="#2e8b57" size={20} />
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <Text>sf</Text>
      <FlatList
        data={data?.me}
        keyExtractor={(item) => "" + item.id}
        renderItem={renderMe}
      />
    </ScreenLayout>
  );
}
