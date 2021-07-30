import React from "react";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function Card({ category, imageUrl, onClick, index }) {
  let [fontsLoaded] = useFonts({
    'mesmerize-cd-bd-it': require('./../../../assets/fonts/mesmerize-cd-bd-it.ttf'),
  });
// const importedImages = [bg1, bg2, bg3, bg4, bg5, bg6];
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
    <TouchableOpacity style={styles.card} onPress={onClick}>
      <View style={styles.flex}>

    <ImageBackground 
            source={{uri: imageUrl}} 
            style={styles.image}
            // blurRadius={10}
            imageStyle={{ opacity: 0.5 }}
            imageStyle={{ borderRadius: 6}}
            >
              <Text style={{
                fontSize: 18,
                position: 'relative',
                textAlign: 'right',
                margin: 10,
                fontFamily: "mesmerize-bk-it",
                fontWeight: 'bold',
                borderRadius: 2,
                color: "white",
                lineHeight: 20,
                textAlign: 'center',
                // backgroundColor: "rgba(0, 0, 0, 0.4)",
                opacity: 0.7
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
    margin: 5,
    elevation: 5,
    justifyContent: "center",
    borderRadius: 5,
    position: "relative",
    overflow: "hidden",
  },
  flex: {
    // display: "flex",
    // flexWrap: "wrap",
    // flexDirection: "row",
    // width: Dimensions.get('window').width * 0.45,
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
    // flex: 1,
    // resizeMode: "cover",
    // justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,.6)'
  }
});
