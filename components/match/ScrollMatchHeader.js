import React, { useState } from "react";
import { Modal, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View`
  height: 60px;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: space-between;
  elevation: 3;
`;
const ModalContent = styled.View`
  background-color: ${colors.grey00};
  margin-top: 110px;
  padding: 10px;
  width: 150px;
  border-radius: 10px;
`;
const ModalWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 6px 0px;
`;
const ModalImgWrapper = styled.View`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;
const MoadalText = styled.Text`
  margin-left: 15px;
  font-size: 17px;
`;
const Action = styled.TouchableOpacity`
  justify-content: center;
  margin-right: 25px;
`;
const InputBox = styled.TouchableOpacity`
  flex-direction: row;
  background-color: rgba(255, 255, 255, 1);
  color: black;
  margin-left: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 7px;
  align-items: center;
  width: 70%;
`;
const Text = styled.Text`
  margin-left: 15px;
`;

function ScrollMatchHeader() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <Pressable
          style={{ flex:1, alignItems: 'flex-end', paddingRight: 15 }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <ModalContent>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate("NewMatch");
              }}
            >
              <ModalWrapper>
                <ModalImgWrapper>
                  <FontAwesome name="paper-plane" size={25} />
                </ModalImgWrapper>
                <MoadalText>Game</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
            >
              <ModalWrapper>
                <ModalImgWrapper>
                  <FontAwesome5 name="newspaper" size={25} />
                </ModalImgWrapper>
                <MoadalText>Foreign</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
            >
              <ModalWrapper>
                <ModalImgWrapper>
                  <Ionicons name="person" size={25} />
                </ModalImgWrapper>
                <MoadalText>Wanted</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>

          </ModalContent>
        </Pressable>
      </Modal>

      <InputBox onPress={() => navigation.navigate("SearchClub")}>
        <Ionicons name="search" size={25} />
        <Text>search</Text>
      </InputBox>
      <Action onPress={() => setModalVisible(true)}>
        <FontAwesome5 name="plus" color={colors.seaGreen} size={25} />
      </Action>
    </Container>
  );
};

export default ScrollMatchHeader;
