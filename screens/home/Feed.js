import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ScrollView, FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../../colors";
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
`;

const SEE_MY_CLUB = gql`
  query seeMyClub($offset: Int!) {
    seeMyClub(offset: $offset) {
      id
      clubname
      emblem
      clubLeader {
        username
      }
      clubMember {
        user {
          totalClubs
        }
      }
    }
  }
`;

const theme = {
  center: "center"
};

const ClubTitle = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ScheuleTitle = styled.View`
  padding: 10px 15px;
  border-bottom-width: 1px;
  border-color: ${colors.grey02};
`;
const Text = styled.Text`
  font-weight: bold;
	font-size: 20px;
`;

export default function Feed({ navigation, route }) {

  const renderMyClubs = ({ item: myClubs }) => {
    return <MyClubList {...myClubs} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);

  const { data: clubData } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });

  const { data, loading, refetch, fetchMore } = useQuery(SEE_MY_SCHED, {
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
        <Ionicons name="paper-plane" color={colors.seaGreen} size={25} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 25 }}
        onPress={() => navigation.navigate("SearchClub")}
      >
        <Ionicons name="search" color={colors.seaGreen} size={25} />
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
      <ClubTitle>
        <Text>My Club</Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate("NewClub")}
        >
          <FontAwesome5 name="plus" color={colors.seaGreen} size={25} />
        </TouchableOpacity>
      </ClubTitle>

      <View style={{ paddingVertical: 10, height: 130 }}>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={clubData?.seeMyClub}
          keyExtractor={(myClubs) => "" + myClubs.id}
          renderItem={renderMyClubs}
        />
      </View>

      <ScheuleTitle>
        <Text>My Scheule</Text>
      </ScheuleTitle>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeMySched}
        keyExtractor={(sched) => "" + sched.id}
        renderItem={renderSched}
      />
    </ScreenLayout>
  );
}
