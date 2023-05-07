import React from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../colors";

const Text = styled.Text`
  color: ${colors.black};
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  font-size: 17px;
`;

export default function ClubSetting() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Club_Setting</Text>

      <Text>-클럽 기본 정보 관리-</Text>
      <TouchableOpacity>
        <Text>클럽이름 및 커버설정</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>클럽소개</Text>
      </TouchableOpacity>

      <Text>-멤버 가입관리-</Text>
      <TouchableOpacity>
        <Text>가입신청</Text>
      </TouchableOpacity>

      <Text>-멤버 활동관리-</Text>
      <TouchableOpacity>
        <Text>멤버권한 설정-글쓰기(매치)권한</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("AppointBoard", {
          clubId: id,
        })}
      >
        <Text>임원임명</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UnappointBoard")}>
        <Text>임원해제</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>멤버탈퇴/차단설정</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>클럽 삭제하기</Text>
      </TouchableOpacity>
    </View>
  )
}
