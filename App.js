import React from "react";
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
export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <NavigationBar title="E-Resamont"></NavigationBar>
      </View>
      <View style={styles.logo}>
        <Image
          source={require("./assets/images/logo_eresamont.png")}
          style={{ width: "100%", height: "100%", margin: 10 }}
        />
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <ButtonView value="Health Assessement" />
          <ButtonView value="Medical Guide" />
          <ButtonView value="Toolbox" />
          <ButtonView value="Mountain Medicine Consultation" />
          <ButtonView value="Questionnaires" />
          <ButtonView value="News" />
          <ButtonView value="About E-Resamont" />
        </ScrollView>
      </View>
    </View>
  );
}

const ButtonView = props => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={{ color: "white" }}>{props.value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  logo: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: 40
  },
  container: {
    flex: 7
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    height: 40,
    width: "60%",
    margin: 10,
    backgroundColor: "#0033cc",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});
