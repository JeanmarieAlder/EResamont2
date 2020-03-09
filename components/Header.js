import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/global";
export default function Header({ title, navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={localStyles.header}>
      <MaterialIcons
        name="menu"
        size={24}
        onPress={openMenu}
        style={globalStyles.headerIcon}
      />
      <View>
        <Text style={globalStyles.headerText}>{title}</Text>
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
