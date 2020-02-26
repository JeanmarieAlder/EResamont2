import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Settings from "../screens/settings";

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
    headerTintColor: "#f44",
    headerStyle: { backgroundColor: "#eee", height: 60 }
  }
});

export default SettingsStack;
