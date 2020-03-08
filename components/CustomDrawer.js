import React, { useContext } from "react";

import { Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";

export default function CustomDrawer({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);

  const homeClick = page => () => {
    navigation.navigate(page);
    navigation.toggleDrawer();
  };

  //TODO: adapt according to the languages + TouchableOpacity below
  const languageClick = languageSelected => () => {
    setLanguage(languageSelected);
    navigation.closeDrawer();
  };
  return (
    <View style={globalStyles.containerDrawer}>
      <View style={globalStyles.drawerTop}>
        <TouchableOpacity onPress={homeClick("EResamont")}>
          <Text style={globalStyles.titleDrawer}>E-Rés@mont</Text>
        </TouchableOpacity>
      </View>
      <View style={globalStyles.drawerButtons}>
        <TouchableOpacity
          style={globalStyles.drawerLanguageButton}
          // onPress={languageClick(4)}
          onPress={() => alert("Translation coming soon")}
        >
          <Text style={{ color: "white" }}>Deutsch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.drawerLanguageButton}
          onPress={languageClick(2)}
        >
          <Text style={{ color: "white" }}>Italiano</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.drawerLanguageButton}
          onPress={languageClick(1)}
        >
          <Text style={{ color: "white" }}>Français</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.drawerLanguageButton}
          onPress={languageClick(3)}
        >
          <Text style={{ color: "white" }}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
