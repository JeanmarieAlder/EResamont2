import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/home";
import subScreen from "../screens/subScreen";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="E-Res@mont" navigation={navigation} />
      };
    }
  },
  SubScreen: {
    screen: subScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header title="The sub screen" navigation={navigation} />
        )
      };
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: "#444",
    headerStyle: { backgroundColor: "#eee", height: 60 }
  }
});

export default HomeStack;
