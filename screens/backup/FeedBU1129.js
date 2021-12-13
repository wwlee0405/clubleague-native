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

const ClubText = styled.Text`
  font-weight: bold;
	font-size: 18px;
`;

const SEEMYCLUB_QUERY = gql`
  query seeMyClub($id: Int!) {
    seeMyClub(id: $id) {
      id
      clubname
      clubMember{
        user {
          username
        }
        club {
          clubname
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

export default function Feed({ navigation, route }) {
  const { data: clubData, loading: loadingClub } = useQuery(SEEMYCLUB_QUERY, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  const renderMyClubs = ({ item: myClubs }) => {
    return <MyClubList {...myClubs} />;
  };
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
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: "green" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewClub")}
          style={{ paddingBottom: 10 }}
        >
          <ClubText>New Club</ClubText>
        </TouchableOpacity>
        <FlatList
          data={clubData?.seeMyClub}
          keyExtractor={(myClubs) => "" + myClubs.id}
          renderItem={renderMyClubs}
        />
      </View>

      <HomeLayout loading={loading}>
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
