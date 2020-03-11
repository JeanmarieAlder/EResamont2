import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { globalStyles } from "../styles/global";
import requestPage from "../utils/requestPage";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";
import storage from "../utils/storage";
import ButtonView from "../components/ButtonView";
import _ from "lodash";
import * as FileSystem from "expo-file-system";
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    getAllPages();
  }, []);
  let getAllPages = async () => {
    // let dataExists2 = await requestPage.fetchUpdatedContent(1522307188037);
    // console.log(dataExists2);
    let data = null;
    let dataExists = await storage.checkStoragePages();
    if (dataExists === false) {
      data = await fetchAndSaveData();
    } else {
      data = await storage.getAllStoragePages();
    }
    setData(data);
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
    height: "100%"
  },
  buttonContainerMain: {
    flex: 3
  },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  loaderViewMain: { flex: 1, alignItems: "center", justifyContent: "center" }
});
