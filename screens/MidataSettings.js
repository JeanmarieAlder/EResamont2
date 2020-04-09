import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  Alert,
  ScrollView,
  ImageBackground
} from "react-native";
import { globalStyles, themeColorSecondary } from "../styles/global";
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

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={globalStyles.container}>
        <Image
          source={require("../assets/images/logo_midata.png")}
          style={localStyles.logoImage}
        />
        <Text
          style={{
            backgroundColor: "rgba(255,255,255, 0.7)",
            padding: 5,
            borderRadius: 5
          }}
        >
          Midata is a citizen owned, non-profit and secure platform to share
          medical data for medical research. You decide the data you want to
          share, researchers will use them to create new treatments for
          everyone.
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
    </ImageBackground>
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
    marginTop: 3,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    backgroundColor: "rgba(255,255,255, 0.5)",
    padding: 5
  },
  buttonContainerMain: { flex: 3 },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
