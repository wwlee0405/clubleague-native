import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Pressable } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import ScreenLayout from "../components/ScreenLayout";
import OutcluberFeedItem from "../components/outcluber/OutcluberFeedItem";
import { GAME_FRAGMENT } from "../fragments";

const SEE_OUTCLUBER_FEED = gql`
  query seeOutcluberFeed($offset: Int!) {
    seeOutcluberFeed(offset: $offset) {
      id
      sport
      club {
        id
        clubname
        emblem
      }
      home {
        homeGame {
          ...GameFragment
        }
      }
      away {
        awayGame {
          ...GameFragment
        }
      }
      createdAt
    }
  }
  ${GAME_FRAGMENT}
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  font-weight: 600;
`;

const Input = styled.TextInput`
  width: ${(props) => props.width / 1.1}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Outcluber({ navigation }) {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, refetch, fetchMore } = useQuery(SEE_OUTCLUBER_FEED, {
    variables: {
      offset: 0,
    },
  });
  const renderOutcluber = ({ item: feed }) => {
    return (
      <Pressable
        onPress={() => 
          navigation.navigate("OutcluberFeed", {
            id: feed.id,
            
          })
        }
        style={({pressed}) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
      >
        <OutcluberFeedItem {...feed} />
      </Pressable>
    );
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>  
      <FlatList
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeOutcluberFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        showsVerticalScrollIndicator={false}
        data={data?.seeOutcluberFeed}
        keyExtractor={(feed) => "" + feed.id}
        renderItem={renderOutcluber}
      />
    </ScreenLayout>
  );
}
