import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { View, Text, Modal, Pressable, TouchableOpacity, Image, Alert, useWindowDimensions } from "react-native";
import { useTheme } from "@react-navigation/native";
import { commonTheme } from "../../theme/commonTheme.js";
import HeaderAvatar from "../HeaderAvatar.js";

const UNJOIN_AWAY_GAME_MUTATION = gql`
  mutation unjoinAwayGame($id: Int!) {
    unjoinAwayGame(id: $id) {
      ok
    }
  }
`;

const joinBtnHeight = '60px'
const Container = styled.View`
  flex: 1;
`;
const ExtraContainer = styled.View`
  padding-bottom: 10px;
`;
const Dates = styled.View`
  padding-top: 10px;
  align-items: center;
  padding-left: 15px;
`;
const MatchDate = styled.Text`
  font-weight: bold;
  font-size: 35px;
`;
const MatchWeek = styled.Text`
  font-weight: 600;
  font-size: 20px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
const GameContent = styled.View`
  margin: 0px 15px 0px;
  flex-direction: row;
`;
const ClubData = styled.Pressable`
  margin-bottom: 15px;
  align-items: center;
  width: 35%;
`;
const ClubEmblem = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const ClubName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const KickOffData = styled.View`
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.Text`
  color: ${commonTheme.yellow};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const Location = styled.Text`
  font-size: 10px;
  text-align: center;
  overflow: hidden;
`;
const AwayBtn = styled.View`
  margin-bottom: 15px;
  align-items: center;
  width: 35%;
`;
const AwayText = styled.Text`
  font-weight: 600;
  font-size: 25px;
`;
const TimeLocationData = styled.View`
  flex-direction: row;
  align-items: center;
`;
const TimeLocation = styled.Text`
  padding-left: 3px;
`;
const Entry = styled.Pressable`
  flex-direction: row;
  padding: 5px 15px 5px;
`;
const EntryText = styled.Text`
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;
const UserAvatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const CaptionData = styled.View`
  padding-top: 10px;
  padding-horizontal: 15px;
`;
const CommentContent = styled.View`
  padding-top: 10px;
  padding-bottom: ${joinBtnHeight};
`;
const CommentCount = styled.Text`
  margin: 8px 15px;
  font-weight: 600;
  font-size: 14px;
`;

const ModalContent = styled.View`
  flex: 1;
  margin-top: 120px;
  padding: 10px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
`;
const ModalWrapper = styled.TouchableOpacity`
  padding: 10px;
`;
const ModalText = styled.Text`
  font-size: 17px;
  text-align: left;
`;

function GameItem({ 
  id,
  user,
  caption,
  homeGame,
  awayGame,
  commentNumber
}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const goToProfile = () => {
    navigation.navigate("Profile", {
      username: user.username,
      id: user.id,
    });
  };
  const joinGameAlert = () => Alert.alert(
    'Please join another game',
    'This game is already joined by another club.', [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
  const { width } = useWindowDimensions();

  const updateUnjoinAwayGame = (cache, result) => {
    const {
      data: {
        unjoinAwayGame: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Game:${awayGame?.id}` });
    }
  };
  const [unjoinAwayGameMutation] = useMutation(UNJOIN_AWAY_GAME_MUTATION, {
    variables: {
      id: awayGame?.id,
    },
    update: updateUnjoinAwayGame,
  });
  const onDeleteClick = () => {
    unjoinAwayGameMutation();
  };

  const logPress = (pressType) => {
    console.log(pressType);
  };
  return (
    <Container style={{backgroundColor: colors.cardHeader}}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flex:1 }}
        >
          <ModalContent style={{backgroundColor: colors.placeholder}}>
              
            <ModalWrapper
              onPress={() => setModalVisible(!modalVisible)}
            >
              <ModalText style={{color: colors.text}}>Update Match</ModalText>
            </ModalWrapper>

            <ModalWrapper 
              onPress={onDeleteClick}
            >
              <ModalText style={{color: colors.text}}>Delete Match</ModalText>
            </ModalWrapper>
             
          </ModalContent>

        </Pressable>
      </Modal>

      <HeaderAvatar
        onPress={goToProfile}
        image={user.avatar}
        topData={user.username}
        bottomData="Seoul, Korea"
      />
      <ExtraContainer style={{backgroundColor: colors.cardContent}}>
        <Dates>
          <MatchDate style={{color: colors.text}}>APR 23</MatchDate>
          <MatchWeek style={{color: colors.text}}>Saturday</MatchWeek>
        </Dates>

        <GameContent>
          <ClubData>
            {homeGame.club.emblem ? (
              <ClubEmblem source={{ uri: homeGame.club.emblem }} />
            ) : (
              <ClubEmblem source={require('../../data/2bar.jpg')} />
            )}
            <ClubName style={{color: colors.text}}>{homeGame.club.clubname}</ClubName>
          </ClubData>
          <KickOffData>
            <KickOffTime>10:00</KickOffTime>
            <Location numberOfLines={1} style={{color: colors.subText}}>Santiago Bernabéu dkndkfnbkdfnbkfjdnb</Location>
          </KickOffData>
          {awayGame?.id ? (
            <ClubData
              onPress={() => null}
              onLongPress={() => setModalVisible(true)}
            >
              {awayGame?.club.emblem ? (
                <ClubEmblem source={{ uri: awayGame?.club.emblem }} />
              ) : (
                <ClubEmblem source={require('../../data/2bar.jpg')} />
              )}
                <ClubName style={{color: colors.text}}>{awayGame?.club.clubname}hvbhjvhvhgvhgvgvvgvgvgvgv</ClubName>
            </ClubData>
          ) : (
            <AwayBtn>
              <AwayText style={{color: colors.subText}}>Away</AwayText>
            </AwayBtn>
            )}
        </GameContent>

        <View style={{ alignItems: "center" }}>
          <TimeLocationData>
            <Feather name="clock" size={15} color={commonTheme.darkGrey} />
            <TimeLocation style={{color: colors.subText}}>14:00 - 16:00</TimeLocation>
          </TimeLocationData>
          <TimeLocationData>
            <Feather name="map-pin" size={15} color={commonTheme.darkGrey} />
            <TimeLocation style={{color: colors.subText}}>Camp Nou</TimeLocation>
          </TimeLocationData>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Entry 
            onPress={() => navigation.navigate("Entry", {
            gameId: homeGame.id,
          })}>
            <EntryText style={{color: colors.subText}}>{homeGame.entryNumber === 1 ? "1 entry" : `${homeGame.entryNumber} entries`}</EntryText>
            <View style={{ paddingRight: 3 }}>
              <UserAvatar source={require('../../data/ffff.jpg')} />
            </View>
            <View style={{ paddingRight: 3 }}>
              <UserAvatar source={require('../../data/gggg.jpg')} />
            </View>
          </Entry>
          {awayGame?.id ? (
            <Entry 
              onPress={() => navigation.navigate("Entry", {
              gameId: awayGame?.id,
            })}>
              <EntryText style={{color: colors.subText}}>{awayGame.entryNumber === 1 ? "1 entry" : `${awayGame.entryNumber} entries`}</EntryText>
              <View style={{ paddingRight: 3 }}>
                <UserAvatar source={require('../../data/ffff.jpg')} />
              </View>
              <View style={{ paddingRight: 3 }}>
                <UserAvatar source={require('../../data/gggg.jpg')} />
              </View>
            </Entry>
          ) : (
            <Entry>
              <EntryText style={{color: colors.subText}}>No awayclub</EntryText>
            </Entry>
          )}
        </View>

        <Image 
          source={require('../../data/bbbb.jpg')}          
          style={{ width, height: 300 }}
        />

        <CaptionData>
          <Text style={{color: colors.subText}}>{caption}</Text>
        </CaptionData>

        <CommentContent>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Comments", {
            matchId: id,
          })}>
            <CommentCount style={{color: colors.subText}}>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
          </TouchableOpacity>
        </CommentContent>

      </ExtraContainer>
    </Container>
  );
}

GameItem.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  homeGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
  awayGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
  commentNumber: PropTypes.number,
};

export default GameItem;
