import React from "react";
import { View } from "react-native";
import { globalStyles } from "../styles/global";
import { WebView } from "react-native-webview";

export default function GMap({ navigation }) {
  return (
    <View style={globalStyles.mapContainer}>
      <WebView
        source={{
          uri: "https://www.google.com/maps/place/46.539382,%206.69420"
        }}
      ></WebView>
    </View>
  );
}
