import { StatusBar } from "expo-status-bar";
import React from "react";
import Card from "./card";
import { StyleSheet, Text, View } from "react-native";

export default function Category({ onClick, data }) {
  return (
    <View style={styles.container}>
      {data.map((itm, index) => (
        <Card
          onClick={() => onClick(itm.type)}
          category={itm.title}
          key={index}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0F8FF"
  },
});
