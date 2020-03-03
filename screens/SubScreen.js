import React, { useState, Component, useContext, use } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";
import { LanguageContext } from "../shared/LanguageContext";

export default function SubScreen({ navigation }) {
  const [tab, setTab] = useState(navigation.state.params);
  const { language, setLanguage } = useContext(LanguageContext);
  if (tab.children.length < 2) {
    return (
      <View style={{ flex: 1 }}>
        {tab.pages_lang[language].text != "" && (
          <WebView
            textZoom={270}
            source={{
              html: tab.pages_lang[language].text.replace(/(\r\n|\n|\r)/gm, " ")
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
    tab.pages_lang[language].plaintext != "" ||
    tab.pages_lang[language].text != ""
  ) {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          textZoom={270}
          source={{
            html:
              tab.pages_lang[language].text === ""
                ? tab.pages_lang[language].plaintext.replace(
                    /(\r\n|\n|\r)/gm,
                    " "
                  )
                : tab.pages_lang[language].text.replace(/(\r\n|\n|\r)/gm, " ")
          }}
          style={{
            flex: 1,
            height: height / 4
          }}
        />
        <View style={styles.buttonView}>
          {tab.children.map(
            child =>
              child.deleted === false && (
                <ButtonView
                  key={child.id}
                  value={child.pages_lang[language].title}
                  onPress={() => {
                    navigation.push("SubScreen", child);
                  }}
                />
              )
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.buttonView}>
          {tab.children.map(
            child =>
              child.deleted === false && (
                <ButtonView
                  key={child.id}
                  value={child.pages_lang[language].title}
                  onPress={() => {
                    navigation.push("SubScreen", child);
                  }}
                />
              )
          )}
        </View>
      </View>
    );
  }
}
let ButtonView = props => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={{ color: "white" }}>{props.value}</Text>
  </TouchableOpacity>
);

const height = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  buttonView: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    height: 40,
    width: "80%",
    margin: 10,
    backgroundColor: "#3f51b5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

// const [tab, setTab] = useState(navigation.state.params);
// const { language, setLanguage } = useContext(LanguageContext);
// if (tab == null) {
//   return (
//     <ScrollView style={globalStyles.container}>
//       <Text style={{ fontWeight: "bold" }}>Current Language: {language}</Text>
//       <Text>{navigation.getParam("body") + "\n\n"}</Text>
//       <Text>This is a leaf. -- {"\n\n"}</Text>
//     </ScrollView>
//   );
// } else {
//   return (
//     <ScrollView style={globalStyles.container}>
//       <Text>{navigation.getParam("body")}</Text>

//       <FlatList
//         data={tab}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => {
//               navigation.push("SubScreen", item);
//             }}
//           >
//             <Text style={globalStyles.titleText}>{item.title}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </ScrollView>
//   );
// }
