import React from "react";
import Card from "./card";
import { ScrollView, StyleSheet } from "react-native";

export default function Category({ onClick, data }) {
  return (
    <ScrollView style={styles.container}>
      {data.map((itm, index) => (
        <Card
          onClick={() => onClick(itm.type)}
          category={itm.title}
          key={index}
          index={index + 1}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#F0F8FF"
  },
});
