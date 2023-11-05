import { gql, useMutation } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";
import { Text, View, Image, Pressable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from "../../themeColors";
import styled from "styled-components/native";
import Button from "../Button.js";

//backup

const Container = styled.View`
  border-radius: 15px;
  background-color: ${themeColors.grey01};
  margin: 5px;
  elevation: 2;
`;
const RequestingMatch = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;
const ClubData = styled.View`
  flex-direction: row;
  width: 260px;
  height: 50px;
`;
const Emblem = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 22.5px;
`;
const Label = styled.View`
  padding-left: 10px;
  width: 200px;
`;
const LabelText = styled.Text`
  font-size: 10px;
  color: ${(props) => (props.homeAwayColor.main)};
`;
const ClubnameText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
const AttendBtn = styled.View`
  width: 80px;
  height: 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: ${themeColors.blue};
`;
const BtnText = styled.Text`
  color: ${themeColors.white};
  align-items: center;
`;
const Entry = styled.Pressable`
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-horizontal: 15px;
`;
const EntryText = styled.Text`
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;
const UserAvatar = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
LabelText.defaultProps = {
  homeAwayColor: {
    main: themeColors.darkGrey
  }
}
const buttonColor = {
  main: themeColors.blue
};
const textColor = {
  main: themeColors.white
};

const TOGGLE_ENTRY_MUTATION = gql`
  mutation toggleEntry($gameId: Int!) {
    toggleEntry(gameId: $gameId) {
      ok
      error
      id
    }
  }
`;

function HomeAway({
  games,
  onPress,
  homeAwayColor,
  labelText,
  clubname,
  isEntry,
  goToEntry,
  entryNumber
}) {
  const navigation = useNavigation();
  const toggleEntryUpdate = (cache, result) => {
    const {
      data: {
        toggleEntry: { ok },
      },
    } = result;

  };
  const [toggleEntry] = useMutation(TOGGLE_ENTRY_MUTATION, {
    variables: {
      gameId: games?.id,
    },
    update: toggleEntryUpdate,
  });
  return (
    <Container>
      <RequestingMatch>
        <TouchableOpacity onPress={onPress}>
          <ClubData>
            <Emblem source={require('../../data/2bar.jpg')} />
            <Label>
              <LabelText homeAwayColor={homeAwayColor}>{labelText}</LabelText>
              <ClubnameText numberOfLines={1}>{clubname}</ClubnameText>
            </Label>
          </ClubData>
        </TouchableOpacity>

        <Button
          onPress={toggleEntry}
          buttonColor={isEntry ? { main : themeColors.grey03 } : buttonColor}
          textColor={isEntry ? { main : themeColors.black } : textColor}
          text={isEntry ? "Unentry" : "Entry"}
        />
      </RequestingMatch>


      <Entry onPress={goToEntry}>
        <EntryText>{entryNumber === 1 ? "1 entry" : `${entryNumber} entries`}</EntryText>
        <View style={{ paddingRight: 3 }}>
          <UserAvatar source={require('../../data/ffff.jpg')} />
        </View>
        <View style={{ paddingRight: 3 }}>
          <UserAvatar source={require('../../data/gggg.jpg')} />
        </View>
      </Entry>
    </Container>
  );
}

HomeAway.propTypes = {
  matchId: PropTypes.number,
  clubname: PropTypes.string,
  isEntry: PropTypes.bool,
  entryNumber: PropTypes.number,
};

export default HomeAway;
