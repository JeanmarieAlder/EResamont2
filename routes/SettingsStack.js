import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../components/Header";
import MidataSettings from "../screens/MidataSettings";
import MyData from "../screens/MyData";
import { globalStyles } from "../styles/global";
const screens = {
  MidataSettings: {
    screen: MidataSettings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title={"Midata Settings"} navigation={navigation} />
        )
      };
    }
  },
  MyData: {
    screen: MyData,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title={"My Data"} navigation={navigation} />
      };
    }
  }
};

const SettingsStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: globalStyles.headerStyle,
    headerTintColor: "black"
  }
});

export default SettingsStack;
