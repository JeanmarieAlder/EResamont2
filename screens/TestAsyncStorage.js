import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { globalStyles } from "../styles/global";
import { requestPage } from "../utils/requestPage";
import WebView from "react-native-webview";
import { AsyncStorage } from "react-native";

//Test screen that retrieves data from api and stores it
//in memory using AsyncStorage.
//Also test if data is correctly stored
export default function TestAsyncStorage({ navigation }) {
  const [resultPage, setResultPage] = useState(null); //The page to display in Webview

  const getData = async () => {
    //ID 100 is saturation d'oxygène quizz
    //ID 95 is Lake Louise
    //ID 113 is Télémédecine
    const response = await requestPage.getPage(95); //get page from api

    try {
      await AsyncStorage.setItem("page_69420", JSON.stringify(response)); //Store string from json page object
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  const GetStorage = async () => {
    try {
      const valueStored = await AsyncStorage.getItem("page_69420"); //Get stored value locally
      if (valueStored !== null) {
        // We have data!!
        console.log(JSON.parse(valueStored).pages_lang[2].plaintext);
        setResultPage(JSON.parse(valueStored));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  const RemoveContent = async () => {
    try {
      await AsyncStorage.removeItem("page_69420"); //Delete item locally
      setResultPage(null); //Also refreshes the content
    } catch (error) {
      // remove error
      console.log(error);
    }

    console.log("Deletion completed.");
  };

  const saveResult = message => {
    //saves locally test results
    alert("entered saveResult");
    //console.log(message.nativeEvent.data);
  };

  return (
    <View style={globalStyles.container}>
      <Button title={"Get data"} onPress={getData}></Button>
      <Text></Text>
      <Button title={"Get Storage"} onPress={GetStorage}></Button>
      <Text></Text>
      <Button title={"Remove Content"} onPress={RemoveContent}></Button>
      <Text>Here is the saved content:</Text>
      {/* Renders the page only if exist, spinning wheel otherwise */}
      {resultPage ? (
        <WebView
          originWhitelist={["*"]}
          javaScriptEnabled={true}
          source={{ html: resultPage.pages_lang[2].plaintext }}
          onMessage={message => saveResult(message.nativeEvent.data)}
          injectedJavaScript={
            'var allRadioButtons = document.querySelectorAll(".form-check-input"); for (var i = 0; i < allRadioButtons.length; i++) {allRadioButtons[i].style.height = "100px"; allRadioButtons[i].style.width = "100px"}'
          }
        ></WebView>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#3f51b5" />
        </View>
      )}
      <Button title={"Save Result"} onPress={saveResult} />
    </View>
  );
}
