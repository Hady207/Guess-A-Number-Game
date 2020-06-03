import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={DefaultStyles.title}>GAME OVER</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/success.png")}
            // source={{uri:}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.resultContainer}>
          <Text style={(DefaultStyles.bodyText, styles.resultText)}>
            Your phone needed{" "}
            <Text style={styles.heighlight}>{props.roundsNumber}</Text> rounds
            to guess the number{" "}
            <Text style={styles.heighlight}>{props.userNumber}</Text>
          </Text>
        </View>

        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 20,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultText: {
    textAlign: "center",
    fontSize: Dimension.get("window").height < 400 ? 16 : 20,
  },
  heighlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
