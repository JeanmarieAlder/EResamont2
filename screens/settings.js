import React, { useState } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { globalStyles } from "../styles/global";

export default function Settings() {
  const [language, setLanguage] = useState("EN");

  return (
    <View style={globalStyles.container}>
      <Text>Settings Screen</Text>

      <Picker
        selectedValue={language}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          setLanguage({ language: itemValue })
        }
      >
        <Picker.Item label="English" value="EN" />
        <Picker.Item label="Français" value="FR" />
      </Picker>
    </View>
  );
}
