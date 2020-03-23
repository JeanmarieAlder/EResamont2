import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import utilities from "../utils/utilities";

export default function Header({ title, navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);

  const openMenu = () => {
    navigation.openDrawer();
  };
  let findTitle = title => {
    if (title == "Home" || title == "test title") {
      return title;
    } else {
      return title[utilities.findLanguageIndex(title, language)].title;
    }
  };

  return (
    <View style={localStyles.header}>
      <MaterialIcons
        name="menu"
        size={24}
        onPress={openMenu}
        style={globalStyles.headerIcon}
        testID={"header-button-menu"}
      />
      <View>
        <Text style={globalStyles.headerText}>{title && findTitle(title)}</Text>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  header: {
    flexDirection: "row"
    // justifyContent: "flex-end",
    // flex: 1
  }
});
