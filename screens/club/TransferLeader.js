import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { colors } from "../../colors";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import UserRowCheckbox from "../../components/profile/UserRowCheckbox";
import UserColumn from "../../components/profile/UserColumn";
import HeaderRight from "../../components/shared/HeaderRight";

const TRANSFER_LEADER = gql`
  mutation transferLeader($id: Int!) {
    transferLeader(id: $id) {
      error
      ok
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

export default function TransferLeader({ route }) {
  const navigation = useNavigation();
  const [chosenLeader, setChosenLeader] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: route?.params?.clubId,
    },
  });

  const transferLeaderUpdate = (cache, result) => {
    const {
      data: {
        transferLeader: { ok, id },
      },
    } = result;

  }

  const [transferLeader] = useMutation(TRANSFER_LEADER, {
    variables: {
      id: chosenLeader,
    },
    update: transferLeaderUpdate,
  });




  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight onPress={transferLeader} />
      ),
    });
  }, [chosenLeader]);
  const chooseLeader = (user) => {
    setChosenLeader(user);
  };
  const renderMember = ({ item: member }) => {
    return (
      <View>
        {member.club.clubLeader.id !== member.user?.id ? (
          <UserRowCheckbox
            onPress={() => chooseLeader(member.id)}
            avatar={member?.user.avatar}
            username={member?.user.username}
            id={member?.id}
            choice={chosenLeader}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View>
      <Top>
      {chosenLeader !== "" ? (
        <UserData>
          <Avatar source={require('../../data/gggg.jpg')} />
          <Username numberOfLines={1}>{chosenLeader}</Username>
        </UserData>
      ) : null}
      </Top>
      <Title>리더후보</Title>
      <FlatList
        data={data?.seeClubMembers}
        keyExtractor={(member) => "" + member.id}
        renderItem={renderMember}
      />
    </View>
  )
}
