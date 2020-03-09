import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../components/Header";
import Settings from "../screens/Settings";
import { globalStyles } from "../styles/global";
const screens = {
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Settings" navigation={navigation} />
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
