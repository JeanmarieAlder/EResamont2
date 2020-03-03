import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../shared/LanguageContext";

export default function Settings() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <View style={globalStyles.container}>
      <Text>Settings Screen</Text>

      <Picker
        selectedValue={language}
        style={{ height: 50, width: 200 }}
        onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
      >
        <Picker.Item label="French" value={0} />
        <Picker.Item label="Italian" value={1} />
        <Picker.Item label="English" value={2} />
      </Picker>
    </View>
  );
}
