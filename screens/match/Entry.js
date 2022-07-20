import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenLayout from "../../components/ScreenLayout";
import UserEntryRow from "../../components/UserEntryRow";
import { colors } from "../../colors";

export default function Entry() {
  return (
    //<ScrollView>를 <View>로 수정할 것==>Flatlist로 할꺼임
    <ScrollView>
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
      <UserEntryRow />
    </ScrollView>
  )
}
