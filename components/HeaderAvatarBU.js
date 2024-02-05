import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import styled from "styled-components/native";
import { Entypo } from '@expo/vector-icons'; 
import { useTheme } from "@react-navigation/native";

const ButtonTochable = styled.Pressable`
  padding: 10px 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ModalContent = styled.View`
  flex: 1;
  margin-top: 100px;
  border-radius: 20px;
  background-color: white;
`;
const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
`;
const MoadalText = styled.Text`
  margin-left: 15px;
  font-size: 17px;
`;

const Wrapper = styled.View`  
  flex-direction: row;
  align-items: center;
`;
const Action = styled.Pressable`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
`;
const Avatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const TextData = styled.View``;
const TextTop = styled.Text`
  font-weight: bold;
`;
const TextBottom = styled.Text`
  margin-top: -3px;
  font-size: 12px;
`;

export default function HeaderAvatar({ onPress, image, topData, bottomData }) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ButtonTochable onPress={onPress}>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ModalContent>
          <ModalView>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Delete Match</Text>
            </Pressable>
          </ModalView>
        </ModalContent>
      </Modal>


      <Wrapper>
        {image ? 
          <Avatar resizeMode="cover" source={{ uri: image }} />
          :
          <Avatar resizeMode="cover" source={require('../data/cccc.jpg')} />
        }
        <TextData>
          <TextTop style={{ color: colors.text }}>{topData}</TextTop>
          <TextBottom style={{ color: colors.subText }}>{bottomData}</TextBottom>
        </TextData>
      </Wrapper>

      <Action onPress={() => setModalVisible(true)}>
        <Entypo name="dots-three-horizontal" size={22} color={colors.subText} />
      </Action>
    </ButtonTochable>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});