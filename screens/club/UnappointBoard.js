import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";
import UserRowCheckbox from "../../components/profile/UserRowCheckbox";
import UserColumn from "../../components/profile/UserColumn";
import HeaderRight from "../../components/shared/HeaderRight";

const UNAPPOINT_BOARD = gql`
  mutation unappointBoard($id: Int!) {
    unappointBoard(id: $id) {
      ok
      error
      id
    }
  }
`;
const SEE_CLUBMEMBER = gql`
  query seeClubMembers($clubId: Int!) {
    seeClubMembers(clubId: $clubId) {
      id
      user {
        id
        username
        avatar
      }
      club {
        clubLeader {
          id
        }
      }
      boardAuth
    }
  }
`;

const avatarDimensions = '40px'
const Top = styled.View`
  padding-horizontal: 15px;
`;
const Title = styled.Text`
  margin: 5px 15px;
  font-size: 12px;
  color: ${colors.darkGrey};
`;
const UserData = styled.View`
  padding: 0px 0px;
  width: ${avatarDimensions};
`;
const Avatar = styled.Image`
  width: ${avatarDimensions};
  height: ${avatarDimensions};
  border-radius: 20px;
`;
const Username = styled.Text`
  padding-top: 1px;
  font-size: 10px;
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

export default function UnappointBoard({ route }) {
  const navigation = useNavigation();
  const [chosenBoard, setChosenBoard] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: route?.params?.clubId,
    },
  });

  const unappointBoardUpdate = (cache, result) => {
    const {
      data: {
        unappointBoard: { ok, id },
      },
    } = result;

  }

  const [unappointBoard] = useMutation(UNAPPOINT_BOARD, {
    variables: {
      id: chosenBoard,
    },
    update: unappointBoardUpdate,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={unappointBoard} />
      ),
    });
  }, [chosenBoard]);
  const chooseBoard = (user) => {
    setChosenBoard(user);
  };
  const renderBoard = ({ item: board }) => {
    return (
      <View>
        {board.boardAuth === true
          && board.club.clubLeader.id !== board.user?.id  ? (
            <UserRowCheckbox
              onPress={() => chooseBoard(board.id)}
              avatar={board?.user.avatar}
              username={board?.user.username}
              id={board?.id}
              choice={chosenBoard}
            />
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <Top>
      {chosenBoard !== "" ? (
        <UserData>
          <Avatar source={require('../../data/gggg.jpg')} />
          <Username numberOfLines={1}>{chosenBoard}</Username>
        </UserData>
      ) : null}
      </Top>

      <Title>Board</Title>
      <FlatList
        data={data?.seeClubMembers}
        keyExtractor={(board) => "" + board.id}
        renderItem={renderBoard}
      />
    </View>
  )
}
