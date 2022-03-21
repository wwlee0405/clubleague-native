import React from "react";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  border-radius: 15px;
  background-color: ${colors.white};
  margin: 5px;
  elevation: 2;
`;
const Header = styled.Pressable`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const UserData = styled.View``;
const Username = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;
const Clubname = styled.Text`
  color: ${colors.darkGrey};
  margin-top: -7px;
`;
const ExtraContainer = styled.View`
  padding: 0px 10px 8px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${colors.whiteSmoke};
`;
const Sports = styled.Text`
  color: ${colors.seaGreen};
  font-weight: bold;
  font-size: 15px;
  padding: 0px 15px 20px;
`;
const MatchContent = styled.View`
  align-items: center;
  justify-content: center;
`;
const ClubData = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const ClubEmblem = styled.Image`
  margin-right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const Date = styled.Text`
  color: ${colors.black};
  font-size: 30px;
  font-weight: bold;
  padding-top: 8px;
`;
const Time = styled.Text`
  color: ${colors.black};
`;
const Location = styled.Text`
  color: ${colors.darkGrey};
  font-weight: 600;
`;

function MatchItem({ id, user, games, club }) {
  const navigation = useNavigation();
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  return (
    <Container>
      <Header onPress={goToProfile}>
        <UserAvatar source={require('../../data/eeee.png')} />
        <UserData>
          <Username>{user.username}</Username>
          <Clubname>{games?.club?.clubname}</Clubname>
        </UserData>
      </Header>
      <ExtraContainer>
        <Sports>Soccer Match</Sports>
        <MatchContent>
          <ClubData>
            <ClubEmblem source={require('../../data/2bar.jpg')} />
            <ClubEmblem source={require('../../data/1ars.jpg')} />
          </ClubData>
          <Date>Jul 20 Sun</Date>
          <Time>10:00-14:00</Time>
          <Location>London</Location>
        </MatchContent>
      </ExtraContainer>
    </Container>
  );
}

MatchItem.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  games: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        clubname: PropTypes.string,
      }),
    }),
  ),
};

export default MatchItem;
