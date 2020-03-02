import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/Header";
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
    headerStyle: { backgroundColor: "#3f51b5", height: 80 },
      headerTintColor: "#fff"
  }
});

export default SettingsStack;
