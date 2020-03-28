import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  AsyncStorage
} from "react-native";
import * as AppAuth from "expo-app-auth";
import { AuthSession } from "expo";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import { LoadingContext } from "../shared/LoadingContext";
import ButtonView from "./ButtonView";
import storage from "../utils/storage";
import requestPage from "../utils/requestPage";
import { Icon } from "react-native-elements";
import { Alert, ToastAndroid } from "react-native";
import authMidata from "../utils/authMidata";

export default function CustomDrawer({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { loading, setLoading } = useContext(LoadingContext);

  //login state
  let [authState, setAuthState] = useState(null);
  let StorageKey = "@EResamont2:MidataOAuthKey";

  useEffect(() => {
    console.log("CustomDrawer: useEffect()");
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  async function getCachedAuthAsync() {
    let value = await AsyncStorage.getItem(StorageKey);
    let authState = JSON.parse(value);
    console.log("getCachedAuthAsync", authState);
    if (authState) {
      if (checkIfTokenExpired(authState)) {
        return refreshAuthAsync(authState);
      } else {
        return authState;
      }
    }
    return null;
  }

  function checkIfTokenExpired({ accessTokenExpirationDate }) {
    return new Date(accessTokenExpirationDate) < new Date();
  }

  async function refreshAuthAsync({ refreshToken }) {
    let authState = await AppAuth.refreshAsync(config, refreshToken);
    console.log("refreshAuth", authState);
    await cacheAuthAsync(authState);
    return authState;
  }
  let config = {
    issuer: "https://test.midata.coop/fhir/metadata",
    clientId: "eresamont2-test",
    serviceConfiguration: {
      authorizationEndpoint: "https://test.midata.coop/authservice",
      tokenEndpoint: "https://test.midata.coop/v1/token"
    }
  };

  async function signInAsync() {
    console.log("signInAsync()");
    console.log(AppAuth.OAuthRedirect);
    let authState = await AppAuth.authAsync(config);
    await cacheAuthAsync(authState);
    console.log("signInAsync", authState);
    return authState;
  }

  async function signOutAsync({ accessToken }) {
    try {
      await AppAuth.revokeAsync(config, {
        token: accessToken,
        isClientIdProvided: true
      });
      await AsyncStorage.removeItem(StorageKey);
      return null;
    } catch (e) {
      alert(`Failed to revoke token: ${e.message}`);
    }
  }

  async function cacheAuthAsync(authState) {
    return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
  }

  const homeClick = page => () => {
    navigation.navigate(page);
    navigation.toggleDrawer();
  };

  const languageClick = languageSelected => () => {
    storage.setLanguageSetting(languageSelected);
    setLanguage(languageSelected);
    navigation.closeDrawer();
  };
  const checkUpdate = async () => {
    let data = await requestPage.fetchUpdatedContent(null);
    console.log(data.length);
    if (data.length === 0) {
      ToastAndroid.show("Data already up to date", ToastAndroid.SHORT);
    } else {
      let res = await storage.updateStoragePages(data);
      res === true && ToastAndroid.show("Data updated", ToastAndroid.SHORT);
      setLoading(true);
    }
  };
  const clearData = async () => {
    await storage.removeAllStoragePages();
    let info = await storage.checkStoragePages();
    if (info === false) {
      ToastAndroid.show("Local data cleared", ToastAndroid.SHORT);
      setLoading(true);
    }
  };
  const confirmClearDataClick = async () => {
    Alert.alert(
      "Confirm local data deletion",
      "Are you sure?",
      [
        { text: "YES", onPress: () => clearData() },
        {
          text: "NO",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };

  const confirmClearScoreClick = async idQuizz => {
    let result = await storage.getQuizScore(idQuizz);
    if (result) {
      Alert.alert(
        "Confirm local score deletion",
        "Current scores are: " + JSON.stringify(result),
        [
          { text: "YES", onPress: () => storage.deleteScoreData(idQuizz) },
          {
            text: "NO",
            style: "cancel"
          }
        ],
        { cancelable: true }
      );
    }
  };
  const checkInternet = async () => {
    let connectionInfo = await requestPage.checkConnection();
    if (connectionInfo && connectionInfo.isInternetReachable) {
      ToastAndroid.show("Test: Online mode", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Test: Offline mode", ToastAndroid.SHORT);
    }
  };
  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={globalStyles.drawerContainer}>
        <View style={globalStyles.drawerTop}>
          <TouchableOpacity
            onPress={homeClick("EResamont")}
            testID={"cd-button-home"}
          >
            <Text style={globalStyles.drawerTitle}>E-Res@mont</Text>
          </TouchableOpacity>
          <View style={globalStyles.drawerTopMenu}>
            <TouchableOpacity onPress={confirmClearDataClick}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Clear local storage
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={checkUpdate} testID={"cd-button-update"}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Check for update
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmClearScoreClick(95)}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Clear lake louise data
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => confirmClearScoreClick(100)}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Clear oxygen data
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => checkInternet()}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Check internet
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                const authState = await signInAsync();
                setAuthState(authState);
              }}
            >
              <Text style={globalStyles.drawwerTopMenuText}>Midata Login</Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log(authState)}>
              <Text style={globalStyles.drawwerTopMenuText}>
                Auth State (debug)
              </Text>
              <View style={localStyles.topMenuDivider} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={globalStyles.drawerButtons}>
          <ButtonView
            value="Français"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(1)}
          />
          <ButtonView
            value="Italiano"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(2)}
          />
          <ButtonView
            value="English"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(3)}
          />
          <ButtonView
            value="Deutsch"
            style={globalStyles.drawerLanguageButton}
            onPress={() => alert("Translation coming soon")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
const localStyles = StyleSheet.create({
  topMenuDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 20
  }
});

//deleteScoreData
