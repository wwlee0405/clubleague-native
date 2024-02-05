import React, { useState } from "react";
import { Modal, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.View``;
const ModalContent = styled.View`
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

const Text = styled.Text`
  margin-left: 15px;
`

function HeaderAvatarDotButton() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Container style={{backgroundColor: colors.background}}>
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
          <ModalContent style={{backgroundColor: colors.cardContent}}>
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
                <MoadalText style={{color: colors.text}}>Game</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => null}
            >
              <ModalWrapper>
                <ModalImgWrapper>
                  <FontAwesome5 name="newspaper" size={25} />
                </ModalImgWrapper>
                <MoadalText style={{color: colors.text}}>Foreign</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => null}
            >
              <ModalWrapper>
                <ModalImgWrapper>
                  <Ionicons name="person" size={25} />
                </ModalImgWrapper>
                <MoadalText style={{color: colors.text}}>Wanted</MoadalText>
              </ModalWrapper>
            </TouchableOpacity>

          </ModalContent>
        </Pressable>
      </Modal>

      
      <Action onPress={() => setModalVisible(true)}>
        <FontAwesome5 name="plus" color={colors.symbolColor} size={25} />
      </Action>
    </Container>
  );
};

export default HeaderAvatarDotButton;
