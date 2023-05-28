import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      totalMember
      clubLeader {
        username
      }
      clubMember {
        id
        boardAuth
        memberAuth
        user {
          id
          avatar
          username
        }
      }
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
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });

  console.log(route);
  console.log(chosenMember);

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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        style={{ paddingHorizontal: 15 }}
      >
        {board.boardAuth === true ? (
          <UserColumn
            username={board?.user.username}
          />
        ) : null}
      </ScrollView>
    );
  };
  const renderMember = ({ item: member }) => {
    return (
      <View>
        {member.boardAuth !== true ? (
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
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderBoard}
      />

      <Title>Member</Title>
      <FlatList
        data={data?.seeClub?.clubMember}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
