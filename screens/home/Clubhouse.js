import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../colors";
import ScreenLayout from "../../components/ScreenLayout";
import ClubItem from "../../components/home/ClubItem";

import AuthButton from "../../components/auth/AuthButton";

const JOIN_CLUB_MUTATION = gql`
  mutation joinClub($id: Int!) {
    joinClub(id: $id) {
      ok
    }
  }
`;

const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      clubname
      clubArea
      clubLeader{
        id
        username
      }
      clubMember{
        id
        user {
          username
        }
        club {
          clubname
        }
      }
      totalMember
      isJoining
    }
  }
`;

const JoinBtn = styled(AuthButton)`
  margin-left: 20px;
  margin-top: 30px;
  width: 100px;
  background-color: ${colors.darkGrey};
`;

export default function Clubhouse({ route }) {
  const { data, loading } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const [refreshing, setRefreshing] = useState();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [joinClub] = useMutation(JOIN_CLUB_MUTATION, {
    variables: {
      id: route?.params?.id,
    },
  });
  const getButton = (seeClub) => {
    const { isJoining } = seeClub;
    if (!isJoining) {
      return <JoinBtn onClick={joinClub} text="Join this Club" />;
    }
  };
  console.log(data);
  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          backgroundColor: "white",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ClubItem {...data?.seeClub} />
        {data?.seeClub ? getButton(data.seeClub) : null}
      </ScrollView>
    </ScreenLayout>
  );
}
