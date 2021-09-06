import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MyClub from "../../components/home/MyClub";
import Photo from "../../components/Photo";
import MyClubLayout from "../../components/home/MyClubLayout";
import HomeLayout from "../../components/home/HomeLayout";
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
  const { data: me, loading: clubLoading} = useQuery(ME_QUERY);
  const renderMe = ({  me }) => {
    return <MyClub {...me} />;
  };
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderPhoto = ({ item: photo }) => {
    return <Photo {...photo} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="#2e8b57" size={20} />
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);
  return (
    <View>
      <MyClubLayout>
        <FlatList
          style={{ width: "100%" }}
          data={me?.me}
          keyExtractor={(me) => "" + me.id}
          renderItem={renderMe}
        />
      </MyClubLayout>
      <HomeLayout loading={loading}>
        {data?.me}
        <FlatList
          onEndReachedThreshold={0.02}
          onEndReached={() =>
            fetchMore({
              variables: {
                offset: data?.seeFeed?.length,
              },
            })
          }
          refreshing={refreshing}
          onRefresh={refresh}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={data?.seeFeed}
          keyExtractor={(photo) => "" + photo.id}
          renderItem={renderPhoto}
        />
      </HomeLayout>
    </View>
  );
}
