import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  Alert,
  ScrollView
} from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "../components/ButtonView";
import { useAuth2 } from "../shared/LoginMidataContext";
import requestGetMidata from "../utils/requestGetMidata";
import storage from "../utils/storage";
export default function MidataSettings({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const {
    authState,
    userName,
    signInAsync,
    signOutAsync,
    getLoggedUserName
  } = useAuth2();

  let logInPressed = async () => {
    if (authState) {
      ToastAndroid.show("Allready logged in", ToastAndroid.SHORT);
    } else {
      signInAsync();
    }
  };

  let logOutPressed = async () => {
    if (authState) {
      signOutAsync(authState);
    } else {
      ToastAndroid.show("Already logged off", ToastAndroid.SHORT);
    }
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
  return (
    <View style={globalStyles.container}>
      <Image
        source={require("../assets/images/logo_midata.png")}
        style={localStyles.logoImage}
      />
      <Text>
        Midata is a citizen owned, non-profit and secure platform to share
        medical data for medical research. You decide the data you want to
        share, researchers will use them to create new treatments for everyone.
      </Text>
      {authState && getLoggedUserName() ? (
        <Text style={localStyles.loginStatusText}>Welcome {userName}!</Text>
      ) : (
        <Text style={localStyles.loginStatusText}>Sign in to use Midata</Text>
      )}
      <View style={localStyles.midataContainer}>
        <ScrollView contentContainerStyle={localStyles.scrollViewMain}>
          <ButtonView
            value="Log in / Sign up"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={async () => {
              logInPressed();
            }}
          />
          <ButtonView
            value="My data"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={() => {
              navigation.push("MyData");
            }}
          />
          <ButtonView
            value="Clear local lake louise data (debug)"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={() => {
              confirmClearScoreClick(95);
            }}
          />
          <ButtonView
            value="Clear local oxygen data (debug)"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={() => {
              confirmClearScoreClick(100);
            }}
          />
          <ButtonView
            value="Login status (debug console)"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={() => console.log(authState)}
          />
          <ButtonView
            value="Get my posted data (debug)"
            style={{
              ...globalStyles.midataButton,
              backgroundColor: "darkblue"
            }}
            onPress={async () => {
              if (authState) {
                let response = await requestGetMidata(
                  "https://test.midata.coop/fhir/QuestionnaireResponse/",
                  authState,
                  signInAsync
                );
                console.log(response);
              } else {
                signInAsync();
              }
            }}
          />
          <ButtonView
            value="Sign out"
            style={{ ...globalStyles.midataButton, backgroundColor: "grey" }}
            onPress={async () => {
              logOutPressed();
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  logoImage: {
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
  },
  midataContainer: {
    flex: 1
  },
  loginStatusText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15
  },
  buttonContainerMain: { flex: 3 },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
