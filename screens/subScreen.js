import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { globalStyles } from "../styles/global";

export default function SubScreen({ navigation }) {
  const [tab, setTab] = useState(navigation.getParam("children"));
  if (tab == null) {
    return (
      <ScrollView style={globalStyles.container}>
        <Text>{navigation.getParam("body")}</Text>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={globalStyles.container}>
        <Text>{navigation.getParam("body")}</Text>
        <Text>This is the leaf. {tab[0].title} --</Text>

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
