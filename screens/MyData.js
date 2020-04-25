import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground
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
  const [oxygenScores, setOxygenScores] = useState(null);

  useEffect(() => {
    fetchMyData();
  }, []);

  let fetchMyData = async () => {
    let lakeLouiseScore = await storage.getQuizScore(95);
    setLakeLouiseScores(lakeLouiseScore);
    let oxygenScore = await storage.getQuizScore(100);
    setOxygenScores(oxygenScore);
  };

  let openScorePopup = (quizzName, scoreObject) => {
    Alert.alert(
      quizzName,
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

  let confirmClearScoreClick = async idQuizz => {
    let result = await storage.getQuizScore(idQuizz);
    if (result) {
      Alert.alert(
        "Confirm local score deletion",
        "Are you sure?",
        [
          {
            text: "YES",
            onPress: () => {
              storage.deleteScoreData(idQuizz);
              fetchMyData();
            }
          },
          {
            text: "NO",
            style: "cancel"
          }
        ],
        { cancelable: true }
      );
    }
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
              if (response.status && response.status === "completed") {
                ToastAndroid.show("Data sent successfully!", ToastAndroid.LONG);
              }
            }
          });
        }
        if (oxygenScores) {
          oxygenScores.forEach(async item => {
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
              if (response.status && response.status === "completed") {
                ToastAndroid.show("Data sent successfully!", ToastAndroid.LONG);
              }
            }
          });
        }
        ToastAndroid.show("Sending data to server", ToastAndroid.SHORT);
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
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={localStyles.midataContainer}>
        <View style={globalStyles.container}>
          <ButtonView
            value={"Share my data"}
            onPress={() => sendToServer()}
            style={{
              ...globalStyles.midataButton,
              alignSelf: "center",
              backgroundColor: "darkblue",
              marginBottom: 10,
              marginTop: 0
            }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>
            Your results:
          </Text>

          <ScrollView contentContainerStyle={localStyles.scrollView}>
            <Text style={localStyles.sectionTitle} key={"lake-louise-title"}>
              Lake Louise Quizz:
            </Text>
            <View style={localStyles.scoresContainer}>
              {lakeLouiseScores ? (
                lakeLouiseScores.map(item => (
                  <TouchableOpacity
                    key={item.authored}
                    onPress={() => openScorePopup("Lake Louise Quizz", item)}
                  >
                    <Text style={globalStyles.drawwerTopMenuText}>
                      {jsonFhirConverter.jsonFhirToStringSimplified(95, item)}
                    </Text>
                    <View style={localStyles.topMenuDivider} />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={localStyles.loaderViewMain}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              )}
            </View>

            <Text style={localStyles.sectionTitle} key={"oxygen-title"}>
              Oxygen Saturation Algorithm:
            </Text>
            <View style={localStyles.scoresContainer}>
              {oxygenScores ? (
                oxygenScores.map(item => (
                  <TouchableOpacity
                    key={item.authored}
                    onPress={() =>
                      openScorePopup("Oxygen Saturation Algorithm", item)
                    }
                  >
                    <Text style={globalStyles.drawwerTopMenuText}>
                      {jsonFhirConverter.jsonFhirToStringSimplified(100, item)}
                    </Text>
                    <View style={localStyles.topMenuDivider} />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={localStyles.loaderViewMain}>
                  <ActivityIndicator size="large" color="black" />
                </View>
              )}
            </View>
          </ScrollView>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ButtonView
              value={"Delete Lake Louise data"}
              onPress={() => confirmClearScoreClick(95)}
              style={{
                ...globalStyles.midataButton,
                alignSelf: "center",
                width: "40%",
                marginTop: 0,
                marginBottom: 5,
                backgroundColor: "brown"
              }}
            />
            <ButtonView
              value={"Delete Oxygen Sat. data"}
              onPress={() => confirmClearScoreClick(100)}
              style={{
                ...globalStyles.midataButton,
                alignSelf: "center",
                width: "40%",
                marginTop: 0,
                marginBottom: 5,
                backgroundColor: "brown"
              }}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  logoImage: {
    width: "100%",
    resizeMode: "contain"
  },
  midataContainer: {
    padding: 5,
    flex: 1,
    backgroundColor: "rgba(255,255,255, 0.75)"
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    marginTop: 10
  },
  topMenuDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 10
  },
  bigMenuDivider: {
    borderBottomColor: "black",
    borderBottomWidth: 10
  },
  scoresContainer: {
    padding: 10
  }
});
