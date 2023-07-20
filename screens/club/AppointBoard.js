import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";
import UserRowCheckbox from "../../components/profile/UserRowCheckbox";
import UserColumn from "../../components/profile/UserColumn";
import HeaderRight from "../../components/shared/HeaderRight";

const APPOINT_BOARD = gql`
  mutation appointBoard($id: Int!) {
    appointBoard(id: $id) {
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
  padding: 10px 0px;
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

export default function AppointBoard({ route }) {
  const navigation = useNavigation();
  const [chosenMember, setChosenMember] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: route?.params?.clubId,
    },
  });

  const appointBoardUpdate = (cache, result) => {
    const {
      data: {
        appointBoard: { ok, id },
      },
    } = result;

  }

  const [appointBoard] = useMutation(APPOINT_BOARD, {
    variables: {
      id: chosenMember,
    },
    update: appointBoardUpdate,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={appointBoard} />
      ),
    });
  }, [chosenMember]);

  const chooseMember = (user) => {
    setChosenMember(user);
  };
  const renderBoard = ({ item: board }) => {
    return (
      <View>
        {board.boardAuth === true ? (
          <UserColumn
            username={board?.user.username}
          />
        ) : null}
      </View>
    );
  };
  const renderMember = ({ item: member }) => {
    return (
      <View>
        {member.boardAuth === false ? (
          <UserRowCheckbox
            onPress={() => chooseMember(member.id)}
            avatar={member?.user.avatar}
            username={member?.user.username}
            id={member?.id}
            choice={chosenMember}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <Top>
      {chosenMember !== "" ? (
        <UserData>
          <Avatar source={require('../../data/gggg.jpg')} />
          <Username numberOfLines={1}>{chosenMember}</Username>
        </UserData>
      ) : null}
      </Top>

      <Title>Board</Title>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingHorizontal: 15 }}
        data={data?.seeClubMembers}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderBoard}
      />

      <Title>Member</Title>
      <FlatList
        data={data?.seeClubMembers}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
