import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Settings from "../screens/Settings";

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
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 60 }
  }
});

export default SettingsStack;
