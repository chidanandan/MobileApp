import React from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableOpacity,
} from "react-native";
const bg1 = require('./images/cat_dark_entrepreneurs.jpeg');
const bg2 = require('./images/cat_dark_employees.jpeg');
const bg3 = require('./images/cat_dark_life.jpeg');
const bg4 = require('./images/cat_dark_women.jpeg');
const bg5 = require('./images/cat_dark_men.jpeg');
const bg6 = require('./images/cat_dark_students.jpeg');


export default function Card({ category, onClick, index }) {
  let [fontsLoaded] = useFonts({
    'mesmerize-cd-bd-it': require('./../../assets/fonts/mesmerize-cd-bd-it.ttf'),
  });
const importedImages = [bg1, bg2, bg3, bg4, bg5, bg6];
 console.log("KEY: ", index)  
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View style={styles.flex}>

    <ImageBackground 
            source={importedImages[index]} 
            style={styles.image}
            // blurRadius={10}
            imageStyle={{ opacity: 0.5 }}
            imageStyle={{ borderRadius: 6}}
            >
              <Text style={{
                fontSize: 18,
                position: 'relative',
                textAlign: 'right',
                padding: 10,
                fontFamily: "mesmerize-bk-it",
                fontWeight: 'bold',
                padding: 10,
                borderRadius: 2,
                color: "white",
                lineHeight: 20,
                textAlign: 'center'
              }}>
                {"\n"}
                {category}
                {"\n"}
              </Text>
            </ImageBackground>

        {/* <Text style={styles.index}>{index}</Text> */}
      </View>
    </TouchableOpacity>
  );
}
}

const styles = StyleSheet.create({
  card: {
    // width: "90%",
    // backgroundColor: "#fff",
    margin: 5,
    elevation: 5,
    justifyContent: "center",
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: "#FF5252",
    // padding: 15,
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
    fontFamily: "mesmerize-se-eb-it"
  },
  index: {
    color: "#f6d867",
    fontSize: 100,
    fontWeight: "bold",
    position: "absolute",
    right: -10,
    opacity: 0.3,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,.6)',
    // height: Dimensions.get('window').height * 0.75,
    // padding: 10,
    // margin: 20,
  }
});
