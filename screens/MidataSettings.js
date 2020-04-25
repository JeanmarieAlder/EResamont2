import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  ScrollView,
  ImageBackground
} from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "../components/ButtonView";
import { useAuth2 } from "../shared/LoginMidataContext";

export default function MidataSettings({ navigation }) {
  const { language } = useContext(LanguageContext);
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
          {translate(
            "Midata is a citizen owned, non-profit and secure platform to share medical data for medical research. You decide the data you want to share, researchers will use them to create new treatments for everyone.",
            language
          )}
        </Text>
        {authState && getLoggedUserName() ? (
          <Text style={localStyles.loginStatusText}>
            {translate("Welcome", language)} {userName}!
          </Text>
        ) : (
          <Text style={localStyles.loginStatusText}>
            {translate("Please sign in to use Midata", language)}
          </Text>
        )}
        <View style={localStyles.midataContainer}>
          <ScrollView contentContainerStyle={localStyles.scrollViewMain}>
            <ButtonView
              value={translate("Sign in to Midata", language)}
              style={{
                ...globalStyles.midataButton,
                backgroundColor: "darkblue"
              }}
              onPress={async () => {
                logInPressed();
              }}
            />
            <ButtonView
              value={translate("My data", language)}
              style={{
                ...globalStyles.midataButton,
                backgroundColor: "darkblue"
              }}
              onPress={() => {
                navigation.push("MyData");
              }}
            />
            <ButtonView
              value={translate("Sign out", language)}
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

let translate = (name, language) => {
  if (name === "Welcome") {
    switch (language) {
      case 1:
        return "Bienvenue";
        break;
      case 2:
        return "Bevenuto";
        break;
      case 3:
        return "Welcome";
        break;
      default:
        return "Welcome";
    }
  } else if (name === "Please sign in to use Midata") {
    switch (language) {
      case 1:
        return "Veuillez vous connecter pour utiliser Midata";
        break;
      case 2:
        return "Accedi per utilizzare Midata";
        break;
      case 3:
        return "Please sign in to use Midata";
        break;
      default:
        return "Please sign in to use Midata";
    }
  } else if (
    name ===
    "Midata is a citizen owned, non-profit and secure platform to share medical data for medical research. You decide the data you want to share, researchers will use them to create new treatments for everyone."
  ) {
    switch (language) {
      case 1:
        return "Midata est une plateforme à but non lucratif, appartenant à tous et sécurisée pour la recherche médicale. Vous décidez des données que vous souhaitez partager. Ensuite, les chercheurs vont les utiliser pour mettre au point de nouveaux traitements pour tous.";
        break;
      case 2:
        return "Midata è una piattaforma sicura, senza fini di lucro e di proprietà dei cittadini, per condividere dati medici per la ricerca medica. Decidi tu i dati che vuoi condividere, i ricercatori li useranno per creare nuovi trattamenti per tutti.";
        break;
      case 3:
        return "Midata is a citizen owned, non-profit and secure platform to share medical data for medical research. You decide the data you want to share, researchers will use them to create new treatments for everyone.";
        break;
      default:
        return "Midata is a citizen owned, non-profit and secure platform to share medical data for medical research. You decide the data you want to share, researchers will use them to create new treatments for everyone.";
    }
  } else if (name === "Sign in to Midata") {
    switch (language) {
      case 1:
        return "Se connecter à Midata";
        break;
      case 2:
        return "Accedere a Midata";
        break;
      case 3:
        return "Sign in to Midata";
        break;
      default:
        return "Sign in to Midata";
    }
  } else if (name === "My data") {
    switch (language) {
      case 1:
        return "Mes données";
        break;
      case 2:
        return "I miei dati";
        break;
      case 3:
        return "My data";
        break;
      default:
        return "My data";
    }
  } else if (name === "Sign out") {
    switch (language) {
      case 1:
        return "Se déconnecter";
        break;
      case 2:
        return "Esci";
        break;
      case 3:
        return "Sign out";
        break;
      default:
        return "Sign out";
    }
  }
};

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
