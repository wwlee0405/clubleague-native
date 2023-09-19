import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import AuthButton from "../../components/auth/AuthButton";
import ClubItem from "../../components/club/ClubItem";
import ClubSchedItem from "../../components/club/ClubSchedItem";
import { CLUB_FRAGMENT, MEMBER_FRAGMENT, GAME_FRAGMENT } from "../../fragments";

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
      clubMember {
        ...MemberFragment
      }
    }
  }
  ${CLUB_FRAGMENT}
  ${MEMBER_FRAGMENT}
`;
const SEE_CLUB_SCHED = gql`
  query seeClubSched($id: Int! ,$offset: Int!) {
    seeClubSched(id: $id, offset: $offset) {
      id
      sport
      club {
        id
        isJoined
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
      entries {
        user {
          username
        }
      }
      entryNumber
      isEntry
      createdAt
    }
  }
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

export default function Clubhouse({ route }) {
  const { data: userData } = useMe();
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  const { data: schedData, loading, refetch, fetchMore } = useQuery(SEE_CLUB_SCHED, {
    variables: {
      id: route?.params?.clubId,
      offset: 0,
    },
  });
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
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
              avatar
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
  return (
    <ScreenLayout>
      <ClubItem {...data?.seeClub} />
      {data?.seeClub ? getButton(data.seeClub) : null}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={refresh}
        data={schedData?.seeClubSched}
        keyExtractor={(sched) => "" + sched.id}
        renderItem={renderSched}
      />
    </ScreenLayout>
  );
}
