import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuestionAnswer from "../QuestionAnswer";

const QuotesDisplayer = ({ data, onBackPress }) => {
  console.log('quotesData: ', data);
  let quotesData = data && data[0];
  return (
    <View>
      <View style={styles.categoryContain}>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.nav}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.category}>{quotesData?.title}</Text>
        <TouchableOpacity onPress={onBackPress}>
          {/* <Text style={styles.title}>{quotesData?.quotes.length}</Text> */}
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.quotesContainer}>
        {quotesData?.quotes?.map((item, key) => (
           <Text style={styles.title}>
            {item.quote}
            <Text style={styles.author}>{item.author}</Text>
            </Text>
        ))}
      </ScrollView>
    </View>
  );
};

QuotesDisplayer.propTypes = {};

export default QuotesDisplayer;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    elevation: 5,
    fontWeight: "bold",
    fontFamily: "Roboto",
    padding: 10,
    lineHeight: 18,
    borderRadius: 2,
    backgroundColor: '#E0FFFF'
  },
  nav: {
    fontSize: 12,
    color: 'white',
    fontFamily: "Roboto",
    paddingLeft: 12,
    paddingRight: 12,
    lineHeight: 16
  },
  categoryContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#5254ac",
  },
  category: {
    margin: 0,
    color: 'white',
    justifyContent: "center",
    fontWeight: 'bold',
    padding: 10,
    marginRight: 50
  },
  author: {
    fontWeight: 'normal',
    fontStyle: 'italic'
  },
  quotesContainer: {
      marginBottom: 40
  }
});
