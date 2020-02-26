import React, { Component } from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import NavigationBar from "../components/NavigationBar";
class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.logo}>
          <Image
            source={require("../assets/images/logo_eresamont.png")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <ButtonView
              value="Health Assessement"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
            <ButtonView value="Medical Guiddde" />
            <ButtonView value="Toolbox" />
            <ButtonView value="Mountain Medicine Consultation" />
            <ButtonView value="Questionnaires" />
            <ButtonView value="News" />
            <ButtonView value="About e-Res@mont" />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const ButtonView = props => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={{ color: "white" }}>{props.value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 40
  },
  container: {
    flex: 3
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    height: 40,
    width: "65%",
    margin: 10,
    backgroundColor: "#3f51b5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HomeScreen;
