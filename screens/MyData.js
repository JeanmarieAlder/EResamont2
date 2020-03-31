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
  TouchableOpacity
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

  let confirmClearScoreClick = async idQuizz => {
    let result = await storage.getQuizScore(idQuizz);
    if (result) {
      Alert.alert(
        "Confirm local score deletion",
        "Current scores are: " + JSON.stringify(result),
        [
          {
            text: "YES",
            onPress: () => {
              storage.deleteScoreData(idQuizz);
              setLakeLouiseScores([]);
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
          style={{
            ...globalStyles.midataButton,
            backgroundColor: "darkblue",
            marginBottom: 10
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>Your results:</Text>

        <ScrollView contentContainerStyle={localStyles.scrollView}>
          <Text style={localStyles.sectionTitle} key={"lake-louise-title"}>
            Lake louise:
          </Text>
          {lakeLouiseScores ? (
            lakeLouiseScores.map(item => (
              <TouchableOpacity
                key={item.authored}
                onPress={() => openScorePopup(item)}
              >
                <Text style={globalStyles.drawwerTopMenuText}>
                  {jsonFhirConverter.jsonFhirToStringSimplified(item)}
                </Text>
                <View style={localStyles.topMenuDivider} />
              </TouchableOpacity>
            ))
          ) : (
            <View style={localStyles.loaderViewMain}>
              <ActivityIndicator size="large" color="black" />
            </View>
          )}
        </ScrollView>
        <ButtonView
          value={"Delete my data"}
          onPress={() => confirmClearScoreClick(95)}
          style={globalStyles.midataButton}
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
    padding: 5,
    flex: 1
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
  }
});
