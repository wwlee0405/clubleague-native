import React from "react";
import styled from "styled-components/native";
import { themeColors } from "../../themeColors";
import useMe, { ME_QUERY } from "../../hooks/useMe";
import EditProfileForm from "../../components/profile/EditProfileForm";

const Container = styled.View`
  flex: 1;
  background-color: ${themeColors.white};
`;

export default function EditProfile({ navigation, route }) {
  const { data: userData } = useMe();

  console.log(route);

  return (
    <Container>
      <EditProfileForm {...userData?.me} />
    </Container>
  );
}
