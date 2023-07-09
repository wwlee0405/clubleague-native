import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";

const Container = styled.View`
  margin: 15px;
`;

export default function WritingAuth({ route, clubId }) {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  console.log(route);
  return (
    <Container>
      <Text>WritingAuth</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Container>
  )
}
