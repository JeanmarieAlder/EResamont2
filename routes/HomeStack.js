import { createStackNavigator } from "react-navigation-stack";
import React, { useContext } from "react";
import Header from "../components/Header";
import Home from "../screens/Home";
import SubScreen from "../screens/SubScreen";
import { globalStyles } from "../styles/global";
const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title="Home" navigation={navigation} />
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
    headerStyle: globalStyles.headerStyle,
    headerTintColor: "black"
  }
});

export default HomeStack;
