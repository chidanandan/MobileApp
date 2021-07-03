import React, { useState, useEffect } from "react";
import Card from "./card";
import { ScrollView, StyleSheet } from "react-native";

export default function Category({ onClick, data }) {
  const [shouldDisplay, setShouldDisplay] = useState(true);

  useEffect(() => {
    setShouldDisplay(true);
  }, []);

  const onCategorySelect = (category) => {
    onClick(category);
    setShouldDisplay(false);
  }
  return (
    <ScrollView style={styles.container}>
      {data && data.length && data.map((itm, index) => (
        <Card
          onClick={() => onCategorySelect(itm.type)}
          category={itm.title}
          key={index}
          index={index}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.6)'
  },
});
