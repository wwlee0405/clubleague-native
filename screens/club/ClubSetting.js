import { gql, useQuery } from "@apollo/client";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import useMe from "../../hooks/useMe";

const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      clubname
      emblem
      clubLeader {
        id
      }
    }
  }
`;

const Text = styled.Text`
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 17px;
`;

export default function ClubSetting({route}) {
  const { data: userData } = useMe();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: route?.params?.clubId,
    },
  });

  const clubLeader = data?.seeClub?.clubLeader.id;
  const me = userData?.me.id;
  
  console.log(route);
  
  return (
    <View>

      <Text style={{color: colors.text}}>-클럽 기본 정보 관리-</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("EditNameEmblem", {
          clubId: data?.seeClub?.id,
        })}
      >
        <Text style={{color: colors.text}}>클럽이름 및 커버설정</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={{color: colors.text}}>클럽소개</Text>
      </TouchableOpacity>

      <Text style={{color: colors.text}}>-멤버 가입관리-</Text>
      <TouchableOpacity>
        <Text style={{color: colors.text}}>가입신청</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{color: colors.text}}>유저차단설정</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{color: colors.text}}>팀차단설정</Text>
      </TouchableOpacity>

      {clubLeader === me ? (
        <View>

          <Text style={{color: colors.text}}>-멤버 활동관리-</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("MemberAuth", {
              clubId: data?.seeClub?.id,
            })}
          >
            <Text style={{color: colors.text}}>멤버권한 설정</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("AppointBoard", {
              clubId: data?.seeClub?.id,
            })}
          >
            <Text style={{color: colors.text}}>임원임명</Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            onPress={() => navigation.navigate("UnappointBoard", {
              clubId: data?.seeClub?.id,
            })}
          >
            <Text style={{color: colors.text}}>임원해제</Text>
          </TouchableOpacity>

            
          <TouchableOpacity
            onPress={() => navigation.navigate("TransferLeader", {
              clubId: data?.seeClub?.id,
            })}
          >
            <Text style={{color: colors.text}}>리더양도</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{color: colors.text}}>멤버탈퇴</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={{color: colors.text}}>클럽 삭제하기</Text>
          </TouchableOpacity>

        </View>
      ) : null}
   
    </View>
  )
}
