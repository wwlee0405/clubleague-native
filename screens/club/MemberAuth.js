import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { View, Switch } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const TOGGLE_WRITE_MUTATION = gql`
  mutation toggleWriteAuth($id: Int!) {
    toggleWriteAuth(id: $id) {
      error
      id
      ok
    }
  }
`;
const TOGGLE_INVITE_MUTATION = gql`
  mutation toggleInviteAuth($id: Int!) {
    toggleInviteAuth(id: $id) {
      error
      id
      ok
    }
  }
`;
const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      writeAuth
      inviteAuth
    }
  }
`;

const Container = styled.View`
  margin: 15px;
`;
const Wrep = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const TopText = styled.Text`
  font-size: 15px;
  color: ${colors.black};
`;
const BottomText = styled.Text`
  margin: 5px 0px;
  font-size: 12px;
  color: ${colors.darkGrey};
`;

export default function MemberAuth({ route }) {
  const toggleWriteUpdate = (cache, result) => {
    const {
      data: {
        toggleWriteAuth: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Club:${route.params.clubId}`,
        fields: {
          writeAuth(prev) {
            return !prev;
          },
        },
      });
    };
  };
  const [toggleWrite] = useMutation(TOGGLE_WRITE_MUTATION, {
    variables: {
      id: route?.params?.clubId,
    },
    update: toggleWriteUpdate,
  });
  const toggleInviteUpdate = (cache, result) => {
    const {
      data: {
        toggleInviteAuth: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Club:${route.params.clubId}`,
        fields: {
          inviteAuth(prev) {
            return !prev;
          },
        },
      });
    };
  };
  const [toggleInvite] = useMutation(TOGGLE_INVITE_MUTATION, {
    variables: {
      id: route?.params?.clubId,
    },
    update: toggleInviteUpdate,
  });
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });
  return (
    <Container>
      <Wrep>
        <View>
          <TopText>Writing authority</TopText>
          <BottomText>모든 멤버에게 글쓰기(매치) 권한을 줍니다.</BottomText>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={data?.seeClub.writeAuth ? '#0095F6' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleWrite}
          value={data?.seeClub.writeAuth}
        />
      </Wrep>
      <Wrep>
        <View>
          <TopText>Invite authority</TopText>
          <BottomText>모든 멤버에게 친구 초대하기 권한을 줍니다.</BottomText>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={data?.seeClub.inviteAuth ? '#0095F6' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleInvite}
          value={data?.seeClub.inviteAuth}
        />
      </Wrep>
    </Container>
  )
}
