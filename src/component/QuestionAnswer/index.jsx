import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AdMobBanner, PublisherBanner } from "expo-ads-admob";

const QuestionAnswer = ({ data, index }) => {
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((prev) => !prev);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.question}>
          <TouchableOpacity
            onPress={handleExpand}
            style={styles.questionContain}
          >
            <Text style={styles.index}>#{index}</Text>
            <Text style={styles.questionText}>{data?.ques}</Text>
          </TouchableOpacity>
        </View>
        {expand || true ? (
          <View style={styles.answer}>
            <Text style={styles.answerText}>{data?.ans}</Text>
          </View>
        ) : null}
      </View>
      {index % 3 === 0 ? (
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => {}}
        />
      ) : null}
    </>
  );
};

QuestionAnswer.propTypes = {};

export default QuestionAnswer;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "#fff",
    margin: 10,
    elevation: 2,
    justifyContent: "center",
    borderRadius: 2,
    padding: 10,
    overflow: "hidden",
  },
  questionContain: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    width: "100%",
  },
  question: {
    padding: 16,
    flexDirection: "row",
  },
  answer: {
    padding: 10,
    borderColor: "#495663",
    borderTopWidth: 1,
  },
  index: {
    color: "#efd81d",
    marginRight: 5,
    fontSize: 40,
    position: "absolute",
    top: -20,
    right: -24,
    fontWeight: "bold",
    opacity: 0.4,
  },
  questionText: {
    color: "#495663",
    fontWeight: "bold",
    lineHeight: 20,
    fontSize: 20,
    opacity: 0.9,
  },
  answerText: {
    color: "#495663",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
    textAlign: "justify",
  },
});
