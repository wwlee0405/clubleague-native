import React from "react";
import { colors } from "../../colors";
import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
import { useNavigation } from "@react-navigation/core";

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  margin: 3px;
  border-radius: 15px;
  background-color: ${colors.white};
  elevation: 3;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Emblem = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 15px;
`;
const Data = styled.View``;
const ClubName = styled.Text`
	font-weight: bold;
`;
const ClubArea = styled.Text`
	color: ${colors.darkGrey};
	font-size: 14px;
`;

export default function SelectClubItem() {
  const { data: meData } = useMe();
  const navigation = useNavigation();

  return (
    <Container>
      <Column>
        <Emblem source={require('../../data/aaaa.jpg')} />
        <Data>
          <ClubName>RealMadrid</ClubName>
          <ClubArea>Madrid, Spain</ClubArea>
        </Data>
      </Column>
    </Container>
  );
}
