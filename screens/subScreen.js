import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from "../styles/global";

export default function SubScreen({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <Text>{"this is a sub screen"}</Text>
    </View>
  );
}
