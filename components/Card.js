import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style={{ ...styles.cards, ...props.style }}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cards: {
    padding: 20,
    borderRadius: 3,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0,
    shadowOpacity: 0.26,
    elevation: 5,
    backgroundColor: "white",
  },
});
