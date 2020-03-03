import { createStackNavigator } from "react-navigation-stack";
import React, { useContext } from "react";
import Header from "../shared/Header";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";
import { LanguageContext } from "../App";

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
      // console.log("param");
      // console.log(navigation.state.params);
      return {
        headerTitle: () => (
          <Header
            title={navigation.state.params.pages_lang[2].title}
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
    headerStyle: { backgroundColor: "#3f51b5", height: 80 },
    headerTintColor: "#fff"
  }
});

export default HomeStack;
