import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { colors } from "../../colors";

const View = styled.View``;
const Text = styled.Text``;
const Container = styled.View`
  width: 100%;
  background-color: ${colors.grey00};
`;
const Header = styled.View`
  flex-direction: row;
  border-bottom-width: 0.3px;
  border-color: ${colors.grey03};
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
  clubname,
  clubArea,
  sports,
  clubLeader,
  clubInfo,
  totalMember
}) {
  return (
    <Container>
      <Header>
        <EmblemWrap>
          <ClubEmblem source={require('../../data/2bar.jpg')} />
        </EmblemWrap>
        <InfoWrap>
          <ClubnameText>{clubname}</ClubnameText>
          <ClubAreaText>{clubArea}</ClubAreaText>
          <Text>sports</Text>
          <LeaderText>Leader <Text>{clubLeader?.username}</Text></LeaderText>
          <MemberText>Members <Text>{totalMember}</Text></MemberText>
        </InfoWrap>
      </Header>
    </Container>
  );
}

ClubItem.propTypes = {
  id: PropTypes.number,
  clubname: PropTypes.string,
  clubArea: PropTypes.string,
  clubLeader: PropTypes.shape({
    username: PropTypes.string,
  }),
  sports: PropTypes.string,
  totalMember: PropTypes.number,
};

export default ClubItem;
