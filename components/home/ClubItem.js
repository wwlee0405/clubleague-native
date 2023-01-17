import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const View = styled.View``;
const Text = styled.Text``;
const Container = styled.View`
  width: 100%;
  background-color: ${colors.grey00};
`;
const Header = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 0.3px;
  border-color: ${colors.grey03};
`;
const EmblemContainer = styled.View`
  margin: 30px 60px 30px 50px;
`;
const InfoContainer = styled.View`
  margin: 10px;
`;
const ClubEmblem = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 50px;
`;
const ClubnameText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
const ClubAreaText = styled.Text`
  font-size: 14px;
  color: ${colors.darkGrey};
`;
const LeaderText = styled.Text`
  margin-top: 15px;
  font-size: 12px;
  color: ${colors.darkGrey};
`;
const MemberText = styled.Text`
  font-size: 12px;
  color: ${colors.darkGrey};
`;

function ClubItem({
  onPress,
  navigation,
  clubname,
  clubArea,
  sports,
  clubInfo,
  clubLeader,
  totalMember
}) {
  return (
    <Container>
      <Header>
        <EmblemContainer>
          <ClubEmblem source={require('../../data/2bar.jpg')} />
        </EmblemContainer>
        <InfoContainer>
          <ClubnameText>{clubname}</ClubnameText>
          <ClubAreaText>{clubArea}</ClubAreaText>
          <Text>sports</Text>
          <LeaderText>Leader <Text>{clubLeader.username}</Text></LeaderText>
          <MemberText>Members <Text>{totalMember}</Text></MemberText>
        </InfoContainer>
      </Header>


    </Container>
  );
}

ClubItem.propTypes = {
  id: PropTypes.number,
  clubname: PropTypes.string,
  clubArea: PropTypes.string,
  sports: PropTypes.string,
  clubLeader: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  totalMember: PropTypes.number,
};

export default ClubItem;
