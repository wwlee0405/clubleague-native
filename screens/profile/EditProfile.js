import React from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import useMe from "../../hooks/useMe";
import EditProfileForm from "../../components/profile/EditProfileForm";

const Container = styled.View`
  flex: 1;
`;

export default function EditProfile({ navigation, route }) {
  const { data: userData } = useMe();
  const { colors } = useTheme();
  return (
    <Container style={{ backgroundColor: colors.background }}>
      <EditProfileForm {...userData?.me} />
    </Container>
  );
}
