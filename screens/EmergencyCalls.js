import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
import { globalStyles, themeColorSecondary } from "../styles/global";
import ButtonView from "../components/ButtonView";
import { Linking } from "expo";
import { MaterialIcons } from "@expo/vector-icons";
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
        {/* <Text>
      DISCLAIMER: buttons are not working on dev. To test it, it will call
      HES-SO VS at Sierre.
    </Text> */}
        <Text style={localStyles.headerText}>Europe (+112)</Text>
        <TouchableOpacity
          onPress={() => callNumber("+41586069001")}
          value={"112"}
        >
          <Image
            style={localStyles.flagButton}
            source={require("../assets/images/eu_circle.png")}
          />
        </TouchableOpacity>
        <Text style={localStyles.headerText}>Switzerland (+112)</Text>
        <TouchableOpacity
          onPress={() => callNumber("+41586069001")}
          value={"144"}
        >
          <Image
            style={localStyles.flagButton}
            source={require("../assets/images/switzerland_circle.png")}
          />
        </TouchableOpacity>
        <Text style={localStyles.headerText}>USA (+911)</Text>
        <TouchableOpacity
          onPress={() => callNumber("+41586069001")}
          value={"911"}
        >
          <Image
            style={localStyles.flagButton}
            source={require("../assets/images/us_circle.png")}
          />
        </TouchableOpacity>
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
  headerText: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    margin: 5,
    color: "white"
  },
  flagButton: { width: 85, height: 85, alignSelf: "center" },
  emergencyButton: {
    borderRadius: 50,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "brown"
  }
});

//      <ImageBackground
//   source={require("../assets/images/mountain.jpg")}
//   style={globalStyles.mountainBackgroundImage}
// >
//   <View style={localStyles.container}>
//     <StatusBar
//       barStyle="dark-content"
//       backgroundColor={themeColorSecondary}
//     />
//     <Text>
//       DISCLAIMER: buttons are not working on dev. To test it, it will call
//       HES-SO VS at Sierre.
//     </Text>
//     <Text style={localStyles.headerText}>Europe: </Text>
//     <ButtonView
//       value={"112"}
//       style={localStyles.emergencyButton}
//       onPress={() => callNumber("+41586069001")}
//     ></ButtonView>
//     <View style={globalStyles.topMenuDivider} />
//     <Text style={localStyles.headerText}>USA:</Text>
//     <ButtonView
//       value={"911"}
//       style={localStyles.emergencyButton}
//       onPress={() => callNumber("+41586069001")}
//     ></ButtonView>
//     <View style={globalStyles.topMenuDivider} />
//     <Text style={localStyles.headerText}>Switzerland:</Text>
//     <ButtonView
//       value={"144"}
//       style={localStyles.emergencyButton}
//       onPress={() => callNumber("+41586069001")}
//     ></ButtonView>
//     <View style={globalStyles.topMenuDivider} />
//   </View>
// </ImageBackground>

// <ImageBackground
//   source={require("../assets/images/mountain.jpg")}
//   style={globalStyles.mountainBackgroundImage}
// >
//   <View style={localStyles.container}>
//     <StatusBar
//       barStyle="dark-content"
//       backgroundColor={themeColorSecondary}
//     />
//     {/* <Text>
//       DISCLAIMER: buttons are not working on dev. To test it, it will call
//       HES-SO VS at Sierre.
//     </Text> */}
//     <Text style={localStyles.headerText}>Europe (+112)</Text>
//     <TouchableOpacity
//       onPress={() => callNumber("+41586069001")}
//       value={"112"}
//     >
//       <Image
//         style={localStyles.flagButton}
//         source={require("../assets/images/eu_circle.png")}
//       />
//     </TouchableOpacity>
//     <Text style={localStyles.headerText}>Switzerland (+112)</Text>
//     <TouchableOpacity
//       onPress={() => callNumber("+41586069001")}
//       value={"144"}
//     >
//       <Image
//         style={localStyles.flagButton}
//         source={require("../assets/images/switzerland_circle.png")}
//       />
//     </TouchableOpacity>
//     <Text style={localStyles.headerText}>USA (+911)</Text>
//     <TouchableOpacity
//       onPress={() => callNumber("+41586069001")}
//       value={"911"}
//     >
//       <Image
//         style={localStyles.flagButton}
//         source={require("../assets/images/us_circle.png")}
//       />
//     </TouchableOpacity>
//   </View>
// </ImageBackground>

// <ImageBackground
//   source={require("../assets/images/mountain.jpg")}
//   style={globalStyles.mountainBackgroundImage}
// >
//   <View style={localStyles.container}>
//     <StatusBar barStyle="dark-content" backgroundColor={themeColorSecondary} />
//     {/* <Text>
//   DISCLAIMER: buttons are not working on dev. To test it, it will call
//   HES-SO VS at Sierre.
// </Text> */}
//     <Text style={localStyles.headerText}>EU/Switzerland (+112)</Text>
//     <TouchableOpacity
//       onPress={() => callNumber("+41586069001")}
//       value={"112"}
//       style={localStyles.emergencyButton}
//     >
//       <MaterialIcons
//         name="call"
//         size={40}
//         style={{ alignSelf: "center", color: "white" }}
//       />
//     </TouchableOpacity>
//     <Text style={localStyles.headerText}>USA (+911)</Text>
//     <TouchableOpacity
//       onPress={() => callNumber("+41586069001")}
//       value={"112"}
//       style={localStyles.emergencyButton}
//     >
//       <MaterialIcons
//         name="call"
//         size={40}
//         style={{ alignSelf: "center", color: "white" }}
//       />
//     </TouchableOpacity>
//   </View>
// </ImageBackground>;
