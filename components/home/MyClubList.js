import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";

const View = styled.View``;
const Touchable = styled.Pressable`
  margin-horizontal: 15px;
`;
const ClubTeam = styled.View`
  align-items: center;
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

function MyClubList({ id, clubname }) {
  const navigation = useNavigation();
  const goToClub = () => {
    navigation.navigate("Clubhouse", {
      clubId: id,
    });
  };
  return (
    <Touchable onPress={goToClub}>
      <ClubTeam>
        <ClubEmblem source={require('../../data/2bar.jpg')} />
        <View>
          <ClubName numberOfLines={1}>{clubname}</ClubName>
        </View>
      </ClubTeam>
    </Touchable>
  );
}

MyClubList.propTypes = {
  id: PropTypes.number,
  clubname: PropTypes.string.isRequired,

};

export default MyClubList;
