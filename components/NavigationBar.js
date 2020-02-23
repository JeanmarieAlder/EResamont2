import React from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { Header, Icon } from "react-native-elements";

const NavigationBar = props => {
  return (
    <Header
      leftComponent={
        <Icon
          name="menu"
          color="#fff"
          onPress={() => alert("open menu")}
        ></Icon>
      }
      centerComponent={<Text style={{ color: "#fff" }}>{props.title}</Text>}
      rightComponent={{ icon: "home", color: "#fff" }}
      barStyle="light-content"
      containerStyle={{ backgroundColor: "#0033cc" }}
    />
  );
};

export default NavigationBar;
