import React, { useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";

export default function Header({ title, navigation }) {
  const { language } = useContext(LanguageContext);

  let findTitle = title => {
    let specialTitles = ["test title", "Midata", "My Data", "GPS"];
    if (specialTitles.includes(title)) {
      return title;
    } else if (title == "Home") {
      switch (language) {
        case 1:
          return "Accueil";
          break;
        case 2:
          return "Home page";
          break;
        case 3:
          return "Home";
          break;
        default:
          return "Home";
      }
    } else if (title == "Emergency calls") {
      switch (language) {
        case 1:
          return "Numéros d'urgence";
          break;
        case 2:
          return "Numeri di emergenza";
          break;
        case 3:
          return "Emergency calls";
          break;
        default:
          return "Emergency calls";
      }
    } else {
      return title[utilities.findLanguageIndex(title, language)].title;
    }
  };

  return (
    <View style={localStyles.header}>
      <Text
        style={{
          ...globalStyles.headerText
        }}
        numberOfLines={2}
      >
        {title && findTitle(title)}
      </Text>
    </View>
  );
}
let width = Dimensions.get("window").width * 0.55;
const border = { borderColor: "black", borderStyle: "solid", borderWidth: 0.7 };
const localStyles = StyleSheet.create({
  header: { height: "100%", width: width }
});
