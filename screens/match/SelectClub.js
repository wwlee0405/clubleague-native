import React from "react";
import { useForm } from "react-hook-form";
import {
  Keyboard,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import SelectClubItem from "../../components/match/SelectClubItem";

export default function SelectClub() {
  return (
    <View>

      <SelectClubItem />
      <SelectClubItem />
      <SelectClubItem />

    </View>
  )
}
