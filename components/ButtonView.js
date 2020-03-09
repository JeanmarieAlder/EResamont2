import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../styles/global";
const ButtonView = props => (
  <TouchableOpacity {...props}>
    <Text style={globalStyles.text}>{props.value}</Text>
  </TouchableOpacity>
);
export default ButtonView;
