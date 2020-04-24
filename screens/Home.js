import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  ToastAndroid
} from "react-native";
import { globalStyles, themeColorSecondary } from "../styles/global";
import requestPage from "../utils/requestPage";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import utilities from "../utils/utilities";
import storage from "../utils/storage";
import ButtonView from "../components/ButtonView";

import _ from "lodash";
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const { language, setLanguage } = useContext(LanguageContext);
  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (loading === true) {
      data.length > 1 && setData([]);
      getAllPages();
    }
  }, [loading]);

  let getAllPages = async () => {
    // check local storage, if empty then fetch all online and save, if exists then fetch updates,
    // if updates exists then save updates to storage, if not just load local storage
    let data = [];
    let connectionInfo = await requestPage.checkConnection();
    let dataExists = await storage.checkStoragePages();
    let connectionOK = connectionInfo && connectionInfo.isInternetReachable;
    //No local data, no connection
    if (dataExists === false && connectionOK === false) {
      ToastAndroid.show("No local data, no connection", ToastAndroid.SHORT);
    } //No local data, connection ok => fetch online and save
    else if (dataExists === false && connectionOK === true) {
      ToastAndroid.show("Downloading..", ToastAndroid.SHORT);
      data = await fetchAndSaveData();
    } //Local data exists, connection ok => check online and update local data if possible, then load updated data
    else if (dataExists === true && connectionOK === true) {
      ToastAndroid.show("Checking for update..", ToastAndroid.SHORT);
      data = await fetchLocalStorageWithUpdateCheck();
    } //Local data exists, no connection => just load the local data
    else if (dataExists === true && connectionOK === false) {
      ToastAndroid.show("Local data exists, no connection", ToastAndroid.SHORT);
      data = await storage.getAllStoragePages();
    }
    setData(data);
    setLoading(false);
  };
  let fetchLocalStorageWithUpdateCheck = async () => {
    let data = [];
    let dataNew = await requestPage.fetchUpdatedContent(null);
    if (dataNew.length === 0) {
      console.log("No new data");
      data = await storage.getAllStoragePages();
      ToastAndroid.show("Local data up to date", ToastAndroid.SHORT);
    } else {
      let res = await storage.updateStoragePages(data);
      if (res === true) {
        data = await storage.getAllStoragePages();
        console.log("New data saved");
        ToastAndroid.show(
          "New data fetched since last time",
          ToastAndroid.SHORT
        );
      }
    }
    return data;
  };
  let fetchAndSaveData = async () => {
    const response = await requestPage.fetchAllPages();
    let dataToSave = formatFetchedData(response);
    await storage.saveAllStoragePages(dataToSave);
    return dataToSave;
  };
  let formatFetchedData = data => {
    let dataArray = [];
    dataArray = data.filter(item => item.deleted === false);
    dataArray = _.sortBy(dataArray, "position");
    return dataArray;
  };

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={{ flex: 1 }}>
        <View style={localStyles.logo}>
          <Image
            source={require("../assets/images/logo_eresamont.png")}
            style={localStyles.logoImage}
          />
        </View>
        <View style={localStyles.buttonContainerMain}>
          <ScrollView contentContainerStyle={localStyles.scrollViewMain}>
            {/* <ButtonView
              value="Refresh (debug)"
              style={{ ...globalStyles.button, backgroundColor: "darkblue" }}
              onPress={() => setLoading(true)}
            /> */}
            {data.length > 1 ? (
              data.map(item => (
                <ButtonView
                  key={item.id}
                  value={
                    item.pages_lang[
                      utilities.findLanguageIndex(item.pages_lang, language)
                    ].title
                  }
                  onPress={() => navigation.push("SubScreen", item)}
                  style={globalStyles.button}
                />
              ))
            ) : (
              <View style={localStyles.loaderViewMain}>
                <ActivityIndicator size="large" color="black" />
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  logo: {
    flex: 1,
    marginBottom: 25
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  buttonContainerMain: {
    flex: 3
  },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  loaderViewMain: { flex: 1, alignItems: "center", justifyContent: "center" },
  containerTopButtons: {
    flexDirection: "row",
    borderColor: "red",
    borderStyle: "solid"
  },
  topButton: {
    borderRadius: 10,
    backgroundColor: "grey",
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  }
});
