import React from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
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

//Test on navigation with Drawer and Stacks
import Navigator from "./routes/drawer";

export default function App() {
  return <Navigator />;
}
