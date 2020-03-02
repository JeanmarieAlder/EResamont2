import React, { useState, Component, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { globalStyles } from "../styles/global";
import { LanguageContext } from "../App";

export default function SubScreen({ navigation }) {
  const [tab, setTab] = useState(navigation.getParam("children"));
  const { language, setLanguage } = useContext(LanguageContext);
  if (tab == null) {
    return (
      <ScrollView style={globalStyles.container}>
        <Text style={{ fontWeight: "bold" }}>Current Language: {language}</Text>
        <Text>{navigation.getParam("body") + "\n\n"}</Text>
        <Text>This is a leaf. -- {"\n\n"}</Text>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={globalStyles.container}>
        <Text>{navigation.getParam("body")}</Text>

        <FlatList
          data={tab}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push("SubScreen", item);
              }}
            >
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    );
  }
}
