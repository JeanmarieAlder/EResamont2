import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground
} from "react-native";
import { globalStyles, themeColorSecondary } from "../styles/global";
import ButtonView from "../components/ButtonView";
import { Linking } from "expo";

export default function EmergencyCalls() {
  let callNumber = number => {
    Linking.openURL("tel:" + number);
  };

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={localStyles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={themeColorSecondary}
        />
        <Text>
          DISCLAIMER: buttons are not working on dev. To test it, it will call
          HES-SO VS at Sierre.
        </Text>
        <Text style={localStyles.headerText}>Europe:</Text>
        <ButtonView
          value={"112"}
          style={localStyles.emergencyButton}
          onPress={() => callNumber("+41586069001")}
        ></ButtonView>
        <View style={globalStyles.topMenuDivider} />
        <Text style={localStyles.headerText}>USA:</Text>
        <ButtonView
          value={"911"}
          style={localStyles.emergencyButton}
          onPress={() => callNumber("+41586069001")}
        ></ButtonView>
        <View style={globalStyles.topMenuDivider} />
        <Text style={localStyles.headerText}>Switzerland:</Text>
        <ButtonView
          value={"144"}
          style={localStyles.emergencyButton}
          onPress={() => callNumber("+41586069001")}
        ></ButtonView>
        <View style={globalStyles.topMenuDivider} />
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    backgroundColor: "rgba(255,255,255, 0.75)"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  emergencyButton: {
    borderRadius: 10,
    backgroundColor: "brown",
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
