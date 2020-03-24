import React, { useState, Component, useContext, use } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  ImageBackground
} from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";
import storage from "../utils/storage";
import ButtonView from "../components/ButtonView";
export default function SubScreen({ navigation }) {
  const [tab, setTab] = useState(navigation.state.params);
  const { language, setLanguage } = useContext(LanguageContext);

  let checkScreenType = tab => {
    let result = 0;
    if (
      tab.children.length < 2 &&
      (tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .plaintext != "" ||
        tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
          .text != "")
    ) {
      result = 3; //LEAF
    } else if (
      tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .plaintext != "" ||
      tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
        .text != ""
    ) {
      result = 2; // SUBSCREEN WITH WEB VIEW
    } else {
      result = 1; // SUBSCREEN WITH NO WEB VIEW
    }
    return result;
  };

  let generateJavaScript = id => {
    let generatedJS =
      'var allRadioButtons = document.querySelectorAll(".form-check-input"); for (var i = 0; i < allRadioButtons.length; i++) {allRadioButtons[i].style.height = "65px"; allRadioButtons[i].style.width = "65px"};';
    switch (id) {
      case 95:
        generatedJS +=
          'document.getElementById("send_button").addEventListener("click", function() {window.ReactNativeWebView.postMessage(document.getElementById("score_span").innerHTML);})';
        break;
      case 100:
        generatedJS +=
          'document.getElementById("send_button").addEventListener("click", function() {window.ReactNativeWebView.postMessage(document.getElementById("scoreId").innerHTML);})';
        break;
      default:
        //no javascript injection for nonquizz pages
        generatedJS = "";
        break;
    }
    return generatedJS;
  };
  if (checkScreenType(tab) === 3) {
    //LEAF
    return (
      <View style={localStyles.leafView}>
        <WebView
          textZoom={270}
          source={{
            html:
              tab.pages_lang[
                utilities.findLanguageIndex(tab.pages_lang, language)
              ].text === ""
                ? tab.pages_lang[
                    utilities.findLanguageIndex(tab.pages_lang, language)
                  ].plaintext
                : tab.pages_lang[
                    utilities.findLanguageIndex(tab.pages_lang, language)
                  ].text
          }}
          onMessage={event =>
            storage.saveQuizScore(tab.id, event.nativeEvent.data)
          }
          injectedJavaScript={generateJavaScript(tab.id)}
          javaScriptEnabled={tab.id == 95 || tab.id == 100}
          style={{
            flex: 1,
            height: height
          }}
          testID={"sub-webview"}
        />
      </View>
    );
  } else if (checkScreenType(tab) === 2) {
    // SUBSCREEN WITH WEB VIEW
    return (
      <ImageBackground
        source={require("../assets/images/mountain.jpg")}
        style={globalStyles.mountainBackgroundImage}
      >
        <View style={localStyles.sectionViewTop}>
          <WebView
            textZoom={270}
            source={{
              html:
                tab.pages_lang[
                  utilities.findLanguageIndex(tab.pages_lang, language)
                ].text === ""
                  ? tab.pages_lang[
                      utilities.findLanguageIndex(tab.pages_lang, language)
                    ].plaintext.replace(/(\r\n|\n|\r)/gm, " ")
                  : tab.pages_lang[
                      utilities.findLanguageIndex(tab.pages_lang, language)
                    ].text.replace(/(\r\n|\n|\r)/gm, " ")
            }}
            style={localStyles.sectionViewTopWebView}
          />
          <View style={localStyles.sectionViewBottom}>
            {tab.children.map(
              child =>
                child.deleted === false && (
                  <ButtonView
                    style={globalStyles.button}
                    key={child.id}
                    value={
                      child.pages_lang[
                        utilities.findLanguageIndex(child.pages_lang, language)
                      ].title
                    }
                    onPress={() => {
                      navigation.push("SubScreen", child);
                    }}
                  />
                )
            )}
          </View>
        </View>
      </ImageBackground>
    );
  } else if (checkScreenType(tab) === 1) {
    // SUBSCREEN WITH NO WEB VIEW
    return (
      <ImageBackground
        source={require("../assets/images/mountain.jpg")}
        style={globalStyles.mountainBackgroundImage}
      >
        <View style={localStyles.sectionViewButtonsOnly}>
          <ScrollView
            contentContainerStyle={localStyles.sectionViewButtonsOnlyScrollView}
          >
            {tab.children.map(
              child =>
                child.deleted === false && (
                  <ButtonView
                    style={globalStyles.button}
                    key={child.id}
                    value={
                      child.pages_lang[
                        utilities.findLanguageIndex(child.pages_lang, language)
                      ].title
                    }
                    onPress={() => {
                      navigation.push("SubScreen", child);
                    }}
                  />
                )
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    );
  } else {
    return <View></View>;
  }
}

const height = Math.round(Dimensions.get("window").height);
const localStyles = StyleSheet.create({
  leafView: { flex: 1, padding: 15, backgroundColor: "white" },
  sectionViewTop: { flex: 1, paddingTop: 20 },
  sectionViewTopWebView: { flex: 1, height: height / 4 },
  sectionViewBottom: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  sectionViewButtonsOnly: { flex: 1, marginTop: 20 },
  sectionViewButtonsOnlyScrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
