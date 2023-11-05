import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Text = styled.Text``;
const Container = styled.View`
  width: 100%;
`;
const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 0.3px;
`;
const EmblemWrap = styled.View`
  margin: 30px 60px 30px 50px;
`;
const ClubEmblem = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;
const InfoWrap = styled.View`
  margin: 10px;
`;
const ClubnameText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
const ClubAreaText = styled.Text`
  font-size: 14px;
`;
const LeaderText = styled.Text`
  margin-top: 15px;
  font-size: 12px;
`;
const MemberText = styled.Text`
  font-size: 12px;
`;

function ClubItem({
  clubname,
  emblem,
  clubArea,
  sports,
  clubLeader,
  totalMember
}) {
  const { colors } = useTheme();
  return (
    <Container style={{backgroundColor: colors.background}}>
      <Header style={{borderBottomColor: colors.border}}>
        <EmblemWrap>
          {emblem ? (
            <ClubEmblem source={{ uri: emblem }} />
          ) : (
            <ClubEmblem source={require('../../data/2bar.jpg')} />
          )}
        </EmblemWrap>
        <InfoWrap>
          <ClubnameText style={{color: colors.text}}>{clubname}</ClubnameText>
          <ClubAreaText style={{color: colors.subText}}>{clubArea}</ClubAreaText>
          <Text style={{color: colors.text}}>sports</Text>
          <LeaderText style={{color: colors.subText}}>Leader <Text>{clubLeader?.username}</Text></LeaderText>
          <MemberText style={{color: colors.subText}}>Members <Text>{totalMember}</Text></MemberText>
        </InfoWrap>
      </Header>
    </Container>
  );
}

ClubItem.propTypes = {
  id: PropTypes.number,
  clubname: PropTypes.string,
  emblem: PropTypes.string,
  clubArea: PropTypes.string,
  clubLeader: PropTypes.shape({
    username: PropTypes.string,
  }),
  sports: PropTypes.string,
  totalMember: PropTypes.number,
};

export default ClubItem;
