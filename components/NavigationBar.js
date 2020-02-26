import React from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { Header, Icon } from "react-native-elements";

function NavigationBar({ navigation }) {
  return (
    <Header
      rightComponent={
        <Icon
          name="menu"
          color="#fff"
          onPress={() => navigation.toggleDrawer()}
        ></Icon>
      }
      centerComponent={
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {"props.title"}
        </Text>
      }
      leftComponent={{ icon: "home", color: "#fff" }}
      barStyle="light-content"
      containerStyle={{ backgroundColor: "#3f51b5" }}
    />
  );
}

export default NavigationBar;
