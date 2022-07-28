import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { RefreshControl, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../colors";
import ScreenLayout from "../../components/ScreenLayout";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ClubItem from "../../components/home/ClubItem";

import AuthButton from "../../components/auth/AuthButton";

const JOIN_CLUB_MUTATION = gql`
  mutation joinClub($clubId: Int!) {
    joinClub(clubId: $clubId) {
      ok
      error
      id
    }
  }
`;

const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      clubname
      clubArea
      totalMember
      isJoined
      clubLeader{
        username
      }
      clubMember{
        id
        user{
          username
        }
        club{
          clubname
        }
      }
    }
  }
`;

const theme = {
  center: "center"
};
const JoinBtn = styled(AuthButton)`
  margin-left: 20px;
  margin-top: 30px;
  width: 100px;
  background-color: ${colors.darkGrey};
`;

export default function Clubhouse({ route, clubId }) {
  const { data: userData } = useMe();
  const { data, loading } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const joinClubUpdate = (cache, result) => {
    const {
      data: {
        joinClub: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newMember = {
        __typename: "Member",
        createdAt: Date.now() + "",
        id,
        user: {
          ...userData.me,
        },
        club: {
          isJoining: true,
        },
      };
      const newCacheMember = cache.writeFragment({
        data: newMember,
        fragment: gql`
          fragment BSName on Member {
            id
            user {
              username
            }
            club {
              isJoining
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: `Club:${route.params.clubId}`,
        fields: {
          clubMember(prev) {
            return [...prev, newCacheMember];
          },
          totalMember(prev) {
            return prev + 1;
          },
        },
      });
    };
  }

  const [joinClub] = useMutation(JOIN_CLUB_MUTATION, {
    variables: {
      clubId: route?.params?.clubId
    },
    update: joinClubUpdate,
  });
  const getButton = (seeClub) => {
    const { isJoining } = seeClub;
    if (!isJoining) {
      return <JoinBtn onPress={joinClub} text="Join this Club" />;
    }
  };
  console.log(data);
  return (
    <ScreenLayout theme={theme} loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "white", width: "100%" }}
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
