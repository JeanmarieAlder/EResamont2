import React, { useContext } from "react";
import { Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";
import ButtonView from "./ButtonView";
import storage from "../utils/storage";
import { Icon } from "react-native-elements";
import { Alert, ToastAndroid } from "react-native";
export default function CustomDrawer({ navigation }) {
  const { language, setLanguage } = useContext(LanguageContext);

  const homeClick = page => () => {
    navigation.navigate(page);
    navigation.toggleDrawer();
  };

  const languageClick = languageSelected => () => {
    setLanguage(languageSelected);
    navigation.closeDrawer();
  };
  const clearData = async () => {
    await storage.removeAllStoragePages();
    let info = await storage.checkStoragePages();
    if (info === false) {
      ToastAndroid.show("Local data cleared", ToastAndroid.LONG);
    }
  };
  const confirmClearDataClick = async () => {
    Alert.alert(
      "Confirm local data deletion",
      "Are you sure?",
      [
        { text: "YES", onPress: () => clearData() },
        {
          text: "NO",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
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
          <View style={globalStyles.drawerTopMenu}>
            <ButtonView
              value=" Clear local storage"
              style={globalStyles.drawerLanguageButton}
              onPress={confirmClearDataClick}
            />
          </View>
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
