import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

export default function HeaderRight({ navigation }) {
  return (
    <View style={globalStyles.headerRightStyle}>
      <MaterialIcons
        name="call"
        size={25}
        onPress={() => navigation.push("EmergencyCalls")}
        style={{ marginRight: 18 }}
      />
      <MaterialIcons
        name="my-location"
        size={25}
        onPress={() => navigation.push("Geolocation")}
      />
    </View>
  );
}
