import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";

export default function HeaderLeft({ navigation }) {
  return (
    <View style={globalStyles.headerLeftStyle}>
      <MaterialIcons
        name="menu"
        size={27}
        onPress={() => navigation.openDrawer()}
        style={globalStyles.headerIcon}
        testID={"header-button-menu"}
      />
    </View>
  );
}
