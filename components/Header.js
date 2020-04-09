import React, { useContext } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";

export default function Header({ title, navigation }) {
  const { language } = useContext(LanguageContext);

  let findTitle = title => {
    if (
      title == "Home" ||
      title == "test title" ||
      title == "Midata Settings" ||
      title == "My Data" ||
      title == "Emergency calls" ||
      title == "GPS"
    ) {
      return title;
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
