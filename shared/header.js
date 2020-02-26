import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>

      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "red"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#0954FA",
    alignItems: "center",
    letterSpacing: 1
  },
  icon: {}
});
