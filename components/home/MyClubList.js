import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

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

function MyClubList({ club }) {
  const navigation = useNavigation();
  const goToClub = () => {
    navigation.navigate("Clubhouse", {
      clubId: club.id,
    });
  };
  return (
    <Touchable onPress={goToClub}>
      <ClubTeam>
        {club.emblem ?
          (<ClubEmblem source={{ uri: club.emblem }} />)
          :
          (<ClubEmblem source={require('../../data/2bar.jpg')} />)
        }
        <View>
          <ClubName numberOfLines={1}>{club.clubname}</ClubName>
        </View>
      </ClubTeam>
    </Touchable>
  );
}

MyClubList.propTypes = {
  club: PropTypes.shape({
    id: PropTypes.number,
    emblem: PropTypes.string,
    clubname: PropTypes.string.isRequired,
  }),
};

export default MyClubList;
