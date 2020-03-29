import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid
} from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "../components/ButtonView";
import { useAuth2 } from "../shared/LoginMidataContext";
import storage from "../utils/storage";
import requestPostMidata from "../utils/requestPostMidata";
import jsonFhirConverter from "../utils/jsonFhirConverter";

export default function MyData({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);
  const { authState, signInAsync } = useAuth2();
  const [lakeLouiseScores, setLakeLouiseScores] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    let lakeLouiseScore = await storage.getQuizScore(95);
    setLakeLouiseScores(lakeLouiseScore);
  };

  let openScorePopup = scoreObject => {
    Alert.alert(
      "Lake louise score",
      JSON.stringify(scoreObject),
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  };

  let sendToServer = async () => {
    if (authState) {
      try {
        if (lakeLouiseScores) {
          lakeLouiseScores.forEach(async item => {
            if (!item.sentToServer) {
              console.log(" send to server: " + JSON.stringify(item));
              let response = await requestPostMidata(
                "https://test.midata.coop/fhir/QuestionnaireResponse/",
                authState,
                signInAsync,
                item
              );
              console.log("Server response: ");
              console.log(response);
            }
          });
          ToastAndroid.show(
            "Data sent to server successfully",
            ToastAndroid.SHORT
          );
        }
      } catch (error) {
        ToastAndroid.show("Please log in and try again", ToastAndroid.LONG);
        signInAsync();
      }
    } else {
      ToastAndroid.show("Please log in and try again", ToastAndroid.LONG);
      signInAsync();
    }
  };

  return (
    <View style={localStyles.midataContainer}>
      <View style={globalStyles.container}>
        <ButtonView
          value={"Share my data"}
          onPress={() => sendToServer()}
          style={{ ...globalStyles.midataButton, backgroundColor: "darkblue" }}
        />
        <Text>Your results:</Text>
        <ScrollView contentContainerStyle={localStyles.scrollView}>
          <Text style={localStyles.sectionTitle} key={"lake-louise-title"}>
            Lake louise:
          </Text>
          {lakeLouiseScores ? (
            lakeLouiseScores.map(item => (
              <ButtonView
                key={item.authored}
                value={jsonFhirConverter.jsonFhirToStringSimplified(item)}
                onPress={() => openScorePopup(item)}
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
  );
}

const localStyles = StyleSheet.create({
  logoImage: {
    width: "100%",
    resizeMode: "contain"
  },
  midataContainer: {
    padding: 5,
    flex: 1
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start"
  }
});
