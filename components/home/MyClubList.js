import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Pressable, Image } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";

const Container = styled.View``;
const Touchable = styled.TouchableOpacity``;
const ClubTeam = styled.View`
  align-items: center;
  margin-top: 10px;
`;
const ClubName = styled.Text`
  font-weight: bold;
  width: 70px;
  overflow: hidden;
`;

function MyClubList({ club, clubname }) {
  const navigation = useNavigation();
  const goToClub = () => {
    navigation.navigate("Comments", {
      clubId: club.id,
    });
  };


  return (
    <Container>
      <Pressable onPress={goToClub}>
        <ClubTeam>
          <Image
            style={{ marginHorizontal: 10, width: 85, height: 85, borderRadius: 100 }}
            source={require('../../data/2bar.jpg')}
          />
          <ClubName numberOfLines={1}>{club.clubname}</ClubName>
        </ClubTeam>
      </Pressable>
    </Container>
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
