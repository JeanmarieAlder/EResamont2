import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => (
          <Header
            title="E-Res@mont"
            navigation={navigation}
            style={{ textAlign: "center" }}
          />
        )
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
    headerStyle: { backgroundColor: "#3f51b5", height: 80 }
  }
});

export default HomeStack;
