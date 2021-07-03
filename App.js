import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  StatusBar,
  View,
  BackHandler,
} from "react-native";
import Category from "./src/component/Category";
import QuotesDisplayer from "./src/component/QuotesDisplayer";
import TopBar from "./src/component/TopBar";
import {
  AdMobBanner,
  AdMobInterstitial,
  // PublisherBanner,
  // AdMobRewarded,
  // setTestDeviceIDAsync,
} from "expo-ads-admob";
import { db } from "./src/firebase-config";
// import { bannerAdId, interestialAdID } from "./src/env";
import constants from './src/utilities/constants';
import { storeData, retrieveData, clearAllData } from "./src/services";

export default function App() {
  const [motivationalData, setMotivationalData] = useState([]);
  const [selectedCategory, setSelectedCaetgory] = useState("");
  const [appVersion, setAppVersion] = useState("");
  const [adUnits, setAdUnits] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const bannerAdId = __DEV__ ? adUnits.devBannerId : adUnits.prodBannerId;

  const getDataFromStorage = async () => {
    let motData = await retrieveData(constants.MOTIVATIONAL_QUOTES);
    let adData = await retrieveData(constants.AD_UNITS);
    if (adData) {
      setAdUnits(adData);
    }
    if (motData) {
      setMotivationalData(motData);
    }
    return data;
  }

  const getQuotesFromApi = () => {
    const dbRefObj = db.ref().child(constants.MOTIVATIONAL_QUOTES);
    dbRefObj.on('value', snap => {
      let data = snap.val();
      setMotivationalData(data);
      storeData(constants.MOTIVATIONAL_QUOTES, data);
    });
  };

  const getAdUnitsApi = () => {
    const dbRefObj = db.ref().child(constants.AD_UNITS);
    dbRefObj.on('value', snap => {
      let data = snap.val();
      setAdUnits(data);
      storeData(constants.AD_UNITS, data);
    });
  };

  const getAppVersionFromApi = async () => {
    const dbRefObj = db.ref().child(constants.APP_VERSION);
    let localVersion = await retrieveData(constants.APP_VERSION);
    dbRefObj.on('value', snap => {
      let data = snap.val();
      if(localVersion !== data.version) {
        storeData(constants.APP_VERSION, data.version)
        getQuotesFromApi();
      } else {
    
      }
      setAppVersion(data);
    });
  };

  const getAdUnitVersion = async () => {
    const dbRefObj = db.ref().child(constants.AD_UNIT_VERSION);
    let localVersion = await retrieveData(constants.AD_UNIT_VERSION);
    dbRefObj.on('value', snap => {
      let data = snap.val();
      if(localVersion !== data.version) {
        storeData(constants.AD_UNIT_VERSION, data.version);
        getAdUnitsApi();
      } else {
    
      }
      setAppVersion(data);
    });
  }

  const showInterestialOnLoad = async () => {
    const interestialAdID = __DEV__ ? adUnits.devInterstitialId : adUnits.prodInterstitialId;
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

  useEffect(() => {
    // clearAllData();
    getAppVersionFromApi();
    getAdUnitVersion();
    getDataFromStorage();

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

    return () => {
      backHandler.remove();
      AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const handleCategory = (category) => {
    setSelectedCaetgory(category);
  };

  useEffect(() => {
    if (adUnits) {
      showInterestialOnLoad();
    }

  }, [adUnits]);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: StatusBar.currentHeight,
        }}
      />
     {!selectedCategory ? <TopBar
        onHomePress={() => setSelectedCaetgory("")}
        showBack={!!selectedCategory}
      /> : null}
      {motivationalData && motivationalData.length ? <View style={styles.content}>
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
      </View> : null}
      {adUnits && <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={bannerAdId}
        onDidFailToReceiveAdWithError={() => {
          alert("error");
        }}
      />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D32F2F"
  },
  content: {
    flex: 15,
    backgroundColor: "#f4f4f4",
  },
});
