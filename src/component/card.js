import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Card({ category, onClick }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View>
        <Text style={styles.cardTitle}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "95%",
    backgroundColor: "#F0F8FF",
    margin: 15,
    elevation: 5,
    justifyContent: "center",
    borderRadius: 2,
    padding: 15,
  },
  cardTitle: {
    textAlign: "center",
    margin: 10,
    fontWeight: 'bold'
  },
});
