import React from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { Text, View, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../colors";
import HomeAway from "./HomeAway";

const MatchContainer  = styled.View`
  background-color: ${colors.greyColor};
`;
const Row  = styled.View`
  flex-direction: row;
  background-color: ${colors.greyColor};
`;

function GameItem({ matchId, goToEntry, entryNumber, games, entries, isEntry }) {
  const renderItem = ({ item: matching }) => (
    <HomeAway
      matchId={matchId}
      clubname={matching?.club.clubname}
      goToEntry={goToEntry}
      entryNumber={matching?.entryNumber}
    />
  );

  console.log(entries);
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
