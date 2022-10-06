import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import HeaderAvatar from "../HeaderAvatar.js";
import Button from "../Button.js";

const JOIN_ENTRY_MUTATION = gql`
  mutation joinEntry($gameId: Int!) {
    joinEntry(gameId: $gameId) {
      ok
      error
      id
    }
  }
`;
const UNJOIN_ENTRY_MUTATION = gql`
  mutation unjoinEntry($id: Int!) {
    unjoinEntry(id: $id) {
      ok
    }
  }
`;

const Container = styled.View`
  border-radius: 15px;
  background-color: ${colors.white};
  margin: 5px;
  elevation: 2;
`;
const ExtraContainer = styled.View`
  padding: 0px 10px 8px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${colors.whiteSmoke};
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;
const DateContent = styled.View`
  flex-direction: row;
  align-items: center;
`;
const DateText = styled.Text`
  color: ${colors.black};
  font-size: 30px;
  font-weight: bold;
`;
const WeekText = styled.Text`
  color: ${colors.black};
  font-weight: bold;
`;
const MonthText = styled.Text`
  color: ${colors.darkGrey};
  margin-top: -8px;
`;
const Sports = styled.Text`
  color: ${colors.black};
  font-weight: 600;
  font-size: 15px;
`;
const MatchContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 15px;
`;
const MatchData = styled.View`
  align-items: center;
  justify-content: center;
`;
const HomeAway = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const MatchEmblem = styled.Image`
  margin-right: -10px;
  width: 40px;
  height: 40px;
  border-color: ${colors.whiteSmoke};
  border-width: 3px;
  border-radius: 20px;
`;
const TimeLocationContent = styled.View`
  align-items: center;
  justify-content: center;
`;
const TimeText = styled.Text`
  color: ${colors.seaGreen};
  font-size: 25px;
  font-weight: bold;
`;
const Location = styled.Text`
  color: ${colors.darkGrey};
  font-weight: 600;
`;

function MySchedItem({ route, id, matchId, club, match, entries, entryNumber, games }) {
  const { data: meData } = useMe();
  const navigation = useNavigation();
  const joinEntryUpdate = (cache, result) => {
    const {
      data: {
        joinEntry: { ok, id },
      },
    } = result;
    if (ok && meData?.me) {
      const enterGame = {
        __typename: "Entry",
        createdAt: Date.now() + "",
        id,
        user: {
          ...meData.me,
        },
        game: {
          match: {
            isEntry: true,
          }
        },
      };
      const newCacheEntry = cache.writeFragment({
        data: enterGame,
        fragment: gql`
          fragment BSName on Entry {
            id
            user {
              username
            }
            game {
              match {
                isEntry
              }
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: `Match:${match.id}`,
        fields: {
          isEntry(prev) {
            return true;
          },
        },
      });
    };

  }

  const [joinEntry] = useMutation(JOIN_ENTRY_MUTATION, {
    variables: {
      gameId: id,
    },
    update: joinEntryUpdate,
  });

  const unjoinEntryUpdate = (cache, result) => {
    const {
      data: {
        unjoinEntry: { ok },
      },
    } = result;
    
  };
  const [unjoinEntry] = useMutation(UNJOIN_ENTRY_MUTATION, {
    variables: {
      id: games?.entries.id,
    },
    update: unjoinEntryUpdate,
  });

  const getButton = (match) => {
    const { isEntry } = match;
    if (isEntry) {
      return <Button text="Unentry" onPress={unjoinEntry} />;
    } else {
      return <Button primary text="Entry" onPress={joinEntry} />;
    }
  };
  console.log(match.isEntry);
  return (
    <Container>
      <HeaderAvatar
        avatar={null}
        source={require('../../data/2bar.jpg')}
        topData={club?.clubname}
        bottomData="Seoul, Korea"
      />
      <ExtraContainer>
        <Row>
          <DateContent>
            <DateText>23</DateText>
            <View style={{ paddingLeft: 10 }}>
              <WeekText>SUNDAY</WeekText>
              <MonthText>OCT</MonthText>
            </View>
          </DateContent>
          <View>
            <Sports>Soccer Match</Sports>
          </View>
        </Row>
        <MatchContent>
          <MatchData>
            <HomeAway>
              <MatchEmblem source={require('../../data/2bar.jpg')} />
              <MatchEmblem source={require('../../data/1ars.jpg')} />
              <MatchEmblem source={require('../../data/2bar.jpg')} />
            </HomeAway>
          </MatchData>
          {match ? getButton(match) : null}
        </MatchContent>
        <TimeLocationContent>
          <TimeText>10:00-14:00</TimeText>
          <Location>Santiago Bernabéu</Location>
        </TimeLocationContent>
      </ExtraContainer>
    </Container>
  );
}

MySchedItem.propTypes = {
  id: PropTypes.number,
  club: PropTypes.shape({
    clubname: PropTypes.string.isRequired,
  }),
  match: PropTypes.shape({
    id: PropTypes.number,
    isEntry: PropTypes.bool,
  }),

};

export default MySchedItem;
