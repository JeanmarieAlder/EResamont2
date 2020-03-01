import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/home";
import SubScreen from "../screens/subScreen";

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
    screen: SubScreen,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header
            title={navigation.getParam("title")}
            navigation={navigation}
          />
        )
      };
    }
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: { backgroundColor: "#eee", height: 60 }
  }
});

export default HomeStack;
