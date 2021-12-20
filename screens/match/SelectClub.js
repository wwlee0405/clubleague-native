import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import ScreenLayout from "../../components/ScreenLayout";
import SelectClubItem from "../../components/match/SelectClubItem";

export default function SelectClub() {
  const { data: meData } = useMe();
  const renderMyClubs = ({ item: myClubs }) => {
    return <SelectClubItem {...myClubs} />;
  };
  return (
    <ScreenLayout>
      <FlatList
        data={meData?.me?.userMember}
        keyExtractor={(myClubs) => "" + myClubs.id}
        renderItem={renderMyClubs}
      />
    </ScreenLayout>
  )
}
