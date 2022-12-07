import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { Text, View, Image } from "react-native";
import HeaderAvatar from "../HeaderAvatar.js";
import Button from "../Button.js";

const Container = styled.View`
  border-radius: 15px;
  background-color: ${colors.white};
  margin: 5px;
  elevation: 2;
`;
const Row = styled.View`
  flex-direction: row;
  padding: 10px 15px;
`;
const ButtonTochable = styled.TouchableOpacity``;
const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const NotificationData = styled.View`
  margin-left: 15px;
  width: 95%;
`;
const Caption = styled.Text``;
const Clubname = styled.Text`
  color: ${colors.black};
  font-weight: 600;
  font-size: 15px;
`;
const ButtonRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const ButtonPadding = styled.View`
  padding-right: 20px;
`;
const buttonColor = {
  main: colors.blue
};
const textColor = {
  main: colors.white
};

function NotificationItem() {
  const navigation = useNavigation();

  return (
    <Container>

      <Row>
        <ButtonTochable>
          <Avatar resizeMode="cover" source={require('../../data/2bar.jpg')} />
        </ButtonTochable>

        <NotificationData>
          <Caption><Clubname>arsenal</Clubname> 클럽이 당신의 <Clubname>aespa</Clubname> 클럽에 게임을 신청합니다. 수락하겠습니까?</Caption>

          <ButtonRow>
            <ButtonPadding>
              <Button
                onPress={null}
                text="Yes"
              />
            </ButtonPadding>
            <ButtonPadding>
              <Button
                onPress={null}
                buttonColor={{ main : colors.lightGrey }}
                textColor={{ main : colors.black }}
                text="No"
              />
            </ButtonPadding>
          </ButtonRow>

        </NotificationData>
      </Row>

    </Container>
  );
}

NotificationItem.propTypes = {};

export default NotificationItem;
