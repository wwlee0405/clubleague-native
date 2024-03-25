import { gql, useQuery, useMutation } from "@apollo/client";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme";
import { useNavigation } from "@react-navigation/native";
import ScreenLayout from "../../components/ScreenLayout";
import OutcluberItem from "../../components/outcluber/OutcluberItem";
import EntryButton from "../../components/outcluber/EntryButton";

const SEE_OUTCLUBER = gql`
  query seeOutcluber($id: Int!) {
    seeOutcluber(id: $id) {
      id
      club {
        emblem
        clubname
      }
      outclubers {
        id
        user {
          username
          avatar
        }
      }
      outcluberNumber
      isOutcluber
    
    }
  }
`;
const TOGGLE_OUTCLUBER_MUTATION = gql`
  mutation toggleOutcluber($gameId: Int!) {
    toggleOutcluber(gameId: $gameId) {
      error
      id
      ok
    }
  }
`;

const JoinGameContainer = styled.View`
  position: absolute;
  bottom: 0;
  height: 60px;
  width: 100%;
  align-items: center;
  padding: 5px 0px;
`;
const buttonColor = {
  main: commonTheme.blue
};
const textColor = {
  main: commonTheme.white
};

export default function OutcluberFeed({ route }) {
  const { colors } = useTheme();
  const { data, loading, refetch } = useQuery(SEE_OUTCLUBER, {
    variables: {
      id: route?.params?.id,
    },
  });
  const toggleOutcluberUpdate = (cache, result) => {
    const {
      data: {
        toggleOutcluber: { ok },
      },
    } = result;
    if (ok) {
      const gameId = `Game:${route.params.id}`;
      cache.modify({
        id: gameId,
        fields: {
          isOutcluber(prev) {
            return !prev;
          },
        },
      });
    }
  };
  const [toggleOutcluber] = useMutation(TOGGLE_OUTCLUBER_MUTATION, {
    variables: {
      gameId: route?.params?.id,
    },
    update: toggleOutcluberUpdate,
  });
  const isOutcluber = data?.seeOutcluber?.isOutcluber;

  return (
    <ScreenLayout backgroundColor={colors.cardContent}>
      <ScrollView>
        <OutcluberItem />
      </ScrollView>
      
      <JoinGameContainer>
        <EntryButton
          onPress={toggleOutcluber}
          buttonColor={isOutcluber ? { main : commonTheme.grey03 } : buttonColor}
          textColor={isOutcluber ? { main : commonTheme.black } : textColor}
          text={isOutcluber ? "Unentry" : "Entry"}
        />
      </JoinGameContainer>

    </ScreenLayout>
  )
}
