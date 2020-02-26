import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("SubScreen")}>
        <Text style={globalStyles.titleText}>{"some item menu"}</Text>
      </TouchableOpacity>
    </View>
  );
}
