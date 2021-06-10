import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, StyleSheet, Text, StatusBar, View, BackHandler } from "react-native";
import Category from "./src/component/category";
import QuotesDisplayer from "./src/component/QuotesDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { db } from "./src/firebase-config";
import { bannerAdId, interestialAdID } from './src/env'
import { getData } from './src/services';


export default function App() {
  const [data, setData] = useState([]);
  const [motivationalData, setMotivationalData] = useState([]);
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [showFullAd, setShowFullAd] = useState(false);

   


  const getApiData = async () => {
    let data = await getData('AppData')
    //  alert(JSON.parse(JSON.stringify(data)))
    setData(JSON.parse(JSON.stringify(data)))
  }

  const showInterestialOnLoad = async () => {
    await AdMobInterstitial.setAdUnitID(interestialAdID);
    await AdMobInterstitial.requestAdAsync(); 
    await AdMobInterstitial.addEventListener('interstitialDidFailToLoad',()=>{alert('failed')})
  }

  // const getApiResponse = async () => {
  //   let data = await axios.get('https://jsonmock.hackerrank.com/api/countries?page=1');
  //   data = data && data.data;
  //   setMotivationalData(data);
  // }

  console.log('motivationalData: ', motivationalData)


  useEffect(() => {
    const backAction = async () => {

    //  // alert(showFullAd)
      if (!showFullAd) {
        setShowFullAd(true)
       // alert(showFullAd)
        await AdMobInterstitial.getIsReadyAsync(async (data) => {
          // alert(JSON.stringify(data))
          if (data) {
            await AdMobInterstitial.showAdAsync()
          } else {
            await BackHandler.exitApp()
          }
        })
        return true
      } else {
        return false
      }
    };


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const dbRefObj = db.ref().child('data');
    dbRefObj.on('value', snap => {
      let data = snap.val();
  console.log('motivationalData: ', data);

      setMotivationalData(data);
    });

    // getApiResponse();

    getApiData();
    showInterestialOnLoad();

    return () => {
      backHandler.remove();
    }
  }, []);


  const handleCategory = (category) => {
    setSelectedCaetgory(category);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}
      />
      <TopBar
        onHomePress={() => setSelectedCaetgory("")}
        showBack={!!selectedCategory}
      />
      <View style={styles.content}>
        {selectedCategory ? (
          <QuotesDisplayer
            data={
              motivationalData?.filter((itm) => itm.type === selectedCategory)
            }
            onBackPress={() => setSelectedCaetgory("")}
          />
        ) : (
          <Category onClick={handleCategory} data={motivationalData} />
        )}
      </View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={bannerAdId}
        onDidFailToReceiveAdWithError={() => { alert('error') }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252c9d",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  content: {
    flex: 15,
    backgroundColor: "#fff",
  },
});


