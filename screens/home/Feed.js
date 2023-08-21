import { gql, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import styled from "styled-components/native";
import { colors } from "../../colors";
import ScreenLayout from "../../components/ScreenLayout";
import MyClubList from "../../components/home/MyClubList";
import MySchedItem from "../../components/home/MySchedItem";
import { GAME_FRAGMENT } from "../../fragments";

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
      club {
        id
        clubname
        emblem
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
const TitleText = styled.Text`
  font-weight: bold;
	font-size: 20px;
`;

export default function Feed({ navigation }) {
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
  const renderMyClubs = ({ item: myClubs }) => {
    return <MyClubList {...myClubs} />;
  };
  const renderSched = ({ item: sched }) => {
    return <MySchedItem {...sched} />;
  };

  return (
    <ScreenLayout loading={loading}>

      <ClubTitle>
        <TitleText>My Club</TitleText>
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
        <TitleText>My Scheule</TitleText>
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
