import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import AuthButton from "../../components/auth/AuthButton";
import ClubItem from "../../components/home/ClubItem";
import ClubSchedItem from "../../components/home/ClubSchedItem";
import { CLUB_FRAGMENT, GAME_FRAGMENT } from "../../fragments";

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
      ...ClubFragment
      games {
        id
        match {
          clubsInGame
          games {
            ...GameFragment
          }
        }
        club {
          isJoined
        }
        entryNumber
        isEntry
      }
    }
  }
  ${CLUB_FRAGMENT}
  ${GAME_FRAGMENT}
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
          isJoined: true,
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
              isJoined
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
    const { isJoined } = seeClub;
    if (!isJoined) {
      return <JoinBtn onPress={joinClub} text="Join this Club" />;
    }
  };
  const renderSched = ({ item: sched }) => {
    return <ClubSchedItem {...sched} />;
  };
  console.log(route);

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          backgroundColor: colors.grey00,
          justifyContent: "center",
        }}
      >
        <ClubItem {...data?.seeClub} />
        {data?.seeClub ? getButton(data.seeClub) : null}
      </ScrollView>
      <FlatList
        data={data?.seeClub?.games}
        keyExtractor={(sched) => "" + sched.id}
        renderItem={renderSched}
      />
    </ScreenLayout>
  );
}
