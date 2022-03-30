import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";

const View = styled.View``;
const Touchable = styled.Pressable`
  margin-horizontal: 10px;
`;
const ClubTeam = styled.View`
  align-items: center;
  margin-top: 10px;
`;
const ClubEmblem = styled.Image`
  width: 85px;
  height: 85px;
  border-radius: 47.5px;
`;
const ClubName = styled.Text`
  font-weight: bold;
  width: 100%;
  overflow: hidden;
`;


function MyClubList({ id, club, clubname }) {
  const navigation = useNavigation();
  const goToClub = () => {
    navigation.navigate("Comments", {
      clubId: club.id,
    });
  };


  return (
    <Touchable onPress={goToClub}>
      <ClubTeam>
        <ClubEmblem source={require('../../data/2bar.jpg')} />
        <View>
          <ClubName numberOfLines={1}>{club.clubname}</ClubName>
        </View>
      </ClubTeam>
    </Touchable>
  );
}

MyClubList.propTypes = {
  id: PropTypes.number,
  userMember: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        clubname: PropTypes.string.isRequired,
      }),
    }),
  ),
};

export default MyClubList;
