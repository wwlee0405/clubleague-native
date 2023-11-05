import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { commonTheme } from "../../theme/commonTheme";
import HomeAway from "./HomeAway";
import { useNavigation } from "@react-navigation/native";

//backup

const MatchContainer  = styled.View`
  background-color: ${commonTheme.greyColor};
`;
const Row  = styled.View`
  flex-direction: row;
  background-color: ${commonTheme.greyColor};
`;

function GameItem({ goToEntry, entryNumber, games, isEntry }) {
  const navigation = useNavigation();
  const renderItem = ({ item: matching }) => (
    <HomeAway
      clubname={matching?.club.clubname}
      goToEntry={() => navigation.navigate("Entry", {
        gameId: matching?.id,
      })}
      entryNumber={matching?.entryNumber}
    />
  );
  return (
    <MatchContainer>
      <FlatList
        data={games}
        keyExtractor={(matching) => "" + matching.id}
        renderItem={renderItem}
      />
    </MatchContainer>
  );
}

GameItem.propTypes = {
  matchId: PropTypes.number,
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      joinedGame: PropTypes.bool,
      entryNumber: PropTypes.number,
      club: PropTypes.shape({
        clubname: PropTypes.string.isRequired,
      }),
      match: PropTypes.shape({
        id: PropTypes.number,
      }),
      entries: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            username: PropTypes.string,
          }),
        }),
      ),

    }),
  ),
  entryNumber: PropTypes.number,
};

export default GameItem;
