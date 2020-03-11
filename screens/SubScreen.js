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
import ButtonView from "../components/ButtonView";
export default function SubScreen({ navigation }) {
  const [tab, setTab] = useState(navigation.state.params);
  const { language, setLanguage } = useContext(LanguageContext);

  if (tab.children.length < 2) {
    return (
      <View style={localStyles.leafView}>
        {(tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
          .plaintext != "" ||
          tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
            .text != "") && (
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
            style={{
              flex: 1,
              height: height
            }}
          />
        )}
      </View>
    );
  } else if (
    tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
      .plaintext != "" ||
    tab.pages_lang[utilities.findLanguageIndex(tab.pages_lang, language)]
      .text != ""
  ) {
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
  } else {
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
