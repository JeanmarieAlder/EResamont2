import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import { globalStyles } from "../styles/global";
import { Linking } from "expo";
export default function EmergencyCalls() {
  let callNumber = number => {
    Linking.openURL("tel:" + number);
  };

  return (
    <ImageBackground
      source={require("../assets/images/mountain.jpg")}
      style={globalStyles.mountainBackgroundImage}
    >
      <View style={localStyles.container}>
        <View style={localStyles.regionContainer}>
          <Text style={localStyles.headerText}>Europe (+112)</Text>
          <TouchableOpacity
            onPress={() => callNumber("+112")}
            value={"112"}
            style={localStyles.flag}
          >
            <Image
              style={localStyles.flagButton}
              source={require("../assets/images/eu_circle.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={localStyles.regionContainer}>
          <Text style={localStyles.headerText}>Switzerland (+144)</Text>
          <TouchableOpacity
            onPress={() => callNumber("+144")}
            value={"144"}
            style={localStyles.flag}
          >
            <Image
              style={localStyles.flagButton}
              source={require("../assets/images/switzerland_circle.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={localStyles.regionContainer}>
          <Text style={localStyles.headerText}>USA (+911)</Text>
          <TouchableOpacity
            onPress={() => callNumber("+911")}
            value={"911"}
            style={localStyles.flag}
          >
            <Image
              style={localStyles.flagButton}
              source={require("../assets/images/us_circle.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 15,
    backgroundColor: "rgba(255,255,255, 0.75)"
  },
  regionContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  headerText: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    flex: 1
  },
  flag: { flex: 3 },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: "white"
  },
  flagButton: {
    width: "75%",
    height: "75%",
    resizeMode: "contain",
    alignSelf: "center"
  }
});
