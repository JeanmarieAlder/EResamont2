import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ title, navigation }) {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={openMenu}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    alignItems: "flex-end",
    letterSpacing: 1,
    marginLeft: 10
  },
  icon: { color: "#fff" }
});
