import React, { useContext } from "react";

import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "./ButtonView";
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
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={globalStyles.drawerContainer}>
        <View style={globalStyles.drawerTop}>
          <TouchableOpacity onPress={homeClick("EResamont")}>
            <Text style={globalStyles.drawerTitle}>E-Res@mont</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.drawerButtons}>
          <ButtonView
            value="Français"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(1)}
          />
          <ButtonView
            value="Italiano"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(2)}
          />
          <ButtonView
            value="English"
            style={globalStyles.drawerLanguageButton}
            onPress={languageClick(3)}
          />
          <ButtonView
            value="Deutsch"
            style={globalStyles.drawerLanguageButton}
            onPress={() => alert("Translation coming soon")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
