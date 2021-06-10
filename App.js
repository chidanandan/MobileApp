import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  StatusBar,
  View,
  BackHandler,
} from "react-native";
import Category from "./src/component/category";
import QuotesDisplayer from "./src/component/QuotesDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import { db } from "./src/firebase-config";
import { bannerAdId, interestialAdID } from "./src/env";
import { getData } from "./src/services";

export default function App() {
  const [data, setData] = useState([]);
  const [motivationalData, setMotivationalData] = useState([]);
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [showAd, setShowAd] = useState(false);

  const getApiData = async () => {
    let data = await getData('@AppData')
    setData(data)
  }

  const showInterestialOnLoad = async () => {
    await AdMobInterstitial.setAdUnitID(interestialAdID);
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.addEventListener('interstitialDidClose', function(){
       BackHandler.exitApp()
    })
  }

  // const getApiResponse = async () => {
  //   let data = await axios.get('https://jsonmock.hackerrank.com/api/countries?page=1');
  //   data = data && data.data;
  //   setMotivationalData(data);
  // }

  console.log('motivationalData: ', motivationalData)


  useEffect(() => {
    const backAction = async () => {
      try {
        if (await AdMobInterstitial.getIsReadyAsync()) {
          await AdMobInterstitial.showAdAsync()
        }
      } catch (err) {

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
      AdMobInterstitial.removeAllListeners();
    };
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
        onDidFailToReceiveAdWithError={() => {
          alert("error");
        }}
      />
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
    backgroundColor: "#f4f4f4",
  },
});
