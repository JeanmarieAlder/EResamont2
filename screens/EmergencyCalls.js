import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { globalStyles } from "../styles/global";
import ButtonView from "../components/ButtonView";
import { Linking } from "expo";

export default function EmergencyCalls() {
  let callNumber = number => {
    Linking.openURL("tel:" + number);
  };

  return (
    <View style={localStyles.container}>
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
  );
}

const localStyles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", padding: 15 },
  headerText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  emergencyButton: {
    borderRadius: 10,
    backgroundColor: "red",
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
