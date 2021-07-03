import React, { useState } from "react";
import AppLoading from 'expo-app-loading';
import { Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
const bg1 = require('./images/bg1.jpeg');
const bg2 = require('./images/bg2.jpeg');
const bg3 = require('./images/bg3.jpeg');
const bg4 = require('./images/bg4.jpeg');
const bg5 = require('./images/bg5.jpeg');

const QuotesDisplayer = ({ data, onBackPress }) => {
  let [fontsLoaded] = useFonts({
    'mesmerize-bk-it': require('./../../../assets/fonts/mesmerize-bk-it.ttf'),
  });
  let quotesData = data && data[0];
  let counter = 0;

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View>
      <View style={styles.categoryContain}>
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.nav}>Back</Text>
        </TouchableOpacity>
        {/* <Text style={styles.category}>{quotesData?.title}</Text> */}
      </View>
      <ScrollView style={styles.quotesContainer}>
        {quotesData?.quotes?.map((item, key) => {
          if(counter<4) {
            counter++;
          } else {
            counter=0;
          }
          let importImg = '';
          const imgArr = [bg1, bg2, bg3, bg4, bg5];
          importImg = imgArr[counter];

          return (
          <View style={styles.container}>
            <ImageBackground 
            source={importImg} 
            style={styles.image}
            blurRadius={10}
            imageStyle={{ borderRadius: 6}}
            >
              <Text style={{
                fontSize: 18,
                marginTop: 10,
                marginBottom: 10,
                fontFamily: "mesmerize-bk-it",
                padding: 10,
                lineHeight: 18,
                borderRadius: 2,
                color: "white",
                lineHeight: 20,
                textAlign: 'center'
              }}>
                {item.quote}
                {"\n"}
                {"\n"}
                <Text style={styles.author}>{item.author}</Text>
              </Text>
            </ImageBackground>
          </View>
        )}
        )}
      </ScrollView>
    </View>
  );
            }
};

QuotesDisplayer.propTypes = {};

export default QuotesDisplayer;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontFamily: "Roboto",
    padding: 10,
    lineHeight: 18,
    borderRadius: 2,
    color: "white",
    lineHeight: 20,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  nav: {
    fontSize: 14,
    color: 'white',
    fontFamily: "Roboto",
    fontWeight: "bold",
    padding: 8,
    lineHeight: 16,
  },
  categoryContain: {
    flexDirection: "row",
    backgroundColor: "rgba(8, 8, 8, 0.8)"
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
      marginBottom: 40,
      backgroundColor: "rgba(8, 8, 8, 0.8)",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: Dimensions.get('window').height * 0.75,
    padding: 10,
    margin: 20,
    borderRadius: 50,
  }
});
