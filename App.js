import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import NavigationBar from "./components/NavigationBar";
import HomeScreen from "./screens/HomeScreen";
import WebViewTest from "./screens/WebViewTest";

export default function App() {
  return (
    <React.Fragment>
      <NavigationBar title="e-RES@MONT"></NavigationBar>
      <HomeScreen />
      {/* <WebViewTest /> */}
    </React.Fragment>
  );
}

const Stack = createStackNavigator();
