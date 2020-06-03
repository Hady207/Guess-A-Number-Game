import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../constants/colors";
import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGameScreen = ({ onStartGame }) => {
  const [value, setValue] = useState("");
  const [confirm, setConfirm] = useState("false");
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width,
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window".width / 4));
    };

    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  }, []);

  const handleNumber = (inputText) => {
    setValue(inputText.replace(/[^0-9]g/, ""));
  };

  const resetInputHandler = () => {
    setValue("");
    setConfirm(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(value);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: { resetInputHandler },
          },
        ],
      );
      return;
    }
    setConfirm(true);
    setSelectedNumber(chosenNumber);
    setValue("");
    Keyboard.dismiss();
  };

  let confirmOutput;
  if (confirm)
    confirmOutput = (
      <Card style={styles.summaryContainer}>
        <Text style={styles.text}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={value}
                onChangeText={handleNumber}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.accent}
                    title="Rest"
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.primary}
                    title="Confirm"
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  inputContainer: {
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: 100,
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 80,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
  },
});

export default StartGameScreen;
