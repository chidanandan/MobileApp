import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

export default function Card({ category, onClick, index }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View style={styles.flex}>
        <Text style={styles.cardTitle}>{category}</Text>
        {/* <Text style={styles.index}>{index}</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    backgroundColor: "#fff",
    margin: 24,
    elevation: 5,
    justifyContent: "center",
    // borderRadius: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#495663",
    padding: 15,
    position: "relative",
    overflow: "hidden",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  cardTitle: {
    textAlign: "left",
    margin: 10,
    color: "#495663",
    fontSize: 16,
    fontWeight: "bold",
  },
  index: {
    color: "#f6d867",
    fontSize: 100,
    fontWeight: "bold",
    position: "absolute",
    right: -10,
    opacity: 0.3,
  },
});
