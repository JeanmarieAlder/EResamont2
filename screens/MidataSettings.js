import React, { useContext } from "react";
import { StyleSheet, View, Text, Image, ToastAndroid } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "../components/ButtonView";
import { useAuth2 } from "../shared/LoginMidataContext";

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
      ToastAndroid.show("Allready logged off", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={localStyles.midataContainer}>
      <Image
        source={require("../assets/images/logo_midata.png")}
        style={localStyles.logoImage}
      />
      <View style={globalStyles.container}>
        <Text>
          Midata is a citizen owned, non-profit and secure platform to share
          medical data for medical research. You decide the data you want to
          share, researchers will use them to create new treatments for
          everyone.
        </Text>
        {authState && getLoggedUserName() ? (
          <Text style={localStyles.loginStatusText}>Welcome {userName}</Text>
        ) : (
          <Text style={localStyles.loginStatusText}>Sign in to use Midata</Text>
        )}
        <ButtonView
          value="Log in / Sign up"
          style={{ ...globalStyles.midataButton, backgroundColor: "darkblue" }}
          onPress={async () => {
            logInPressed();
          }}
        />
        <ButtonView
          value="My data"
          style={{ ...globalStyles.midataButton, backgroundColor: "darkblue" }}
          onPress={() => {
            navigation.push("MyData");
          }}
        />
        <ButtonView
          value="Login status (debug console)"
          style={{ ...globalStyles.midataButton, backgroundColor: "darkblue" }}
          onPress={() => console.log(authState)}
        />
        <ButtonView
          value="Sign out"
          style={{ ...globalStyles.midataButton, backgroundColor: "grey" }}
          onPress={async () => {
            logOutPressed();
          }}
        />
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  logoImage: {
    width: "100%",
    resizeMode: "contain"
  },
  midataContainer: {
    padding: 5
  },
  loginStatusText: {
    fontWeight: "bold"
  }
});
