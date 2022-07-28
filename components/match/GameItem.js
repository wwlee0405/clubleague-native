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

function GameItem({ matchId, games }) {
  const renderItem = ({ item: matching }) => (
    <HomeAway
      matchId={matchId}
      clubname={matching?.club.clubname}
      isJoined={matching?.club.isJoined}
    />
  );
  return (
    <MatchContainer>
      <FlatList
        data={games}
        keyExtractor={(matching) => "" + matching.club.clubname}
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
      club: PropTypes.shape({
        clubname: PropTypes.string.isRequired,
        isJoined: PropTypes.bool,
      }),
    }),
  ),
};

export default GameItem;
