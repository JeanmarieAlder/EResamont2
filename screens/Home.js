import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { globalStyles } from "../styles/global";
import requestPage from "../utils/requestPage";
import { LanguageContext } from "../shared/LanguageContext";
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const { language, setLanguage } = useContext(LanguageContext);
  useEffect(() => {
    getAllPages();
  }, []);
  let getAllPages = async () => {
    let result = await requestPage.getAllPages();
    setData(formatData(result));
  };
  let formatData = data => {
    let dataArray = [];
    dataArray = data.filter(item => item.deleted === false);
    return dataArray;
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/logo_eresamont.png")}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={styles.buttonContainerMain}>
        <ScrollView contentContainerStyle={styles.scrollViewMain}>
          {data.length > 1 ? (
            data.map(item => (
              <ButtonView
                key={item.id}
                value={item.pages_lang[language].title}
                onPress={() => navigation.push("SubScreen", item)}
              />
            ))
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
        </ScrollView>
      </View>
    </View>
  );
}

const ButtonView = props => (
  <TouchableOpacity style={styles.button} {...props}>
    <Text style={{ color: "white" }}>{props.value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    marginBottom: 40
  },
  buttonContainerMain: {
    flex: 3
  },
  scrollViewMain: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  button: {
    height: 40,
    width: "65%",
    margin: 10,
    backgroundColor: "#3f51b5",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mockData = [
  {
    title: "Medical Guide",
    body: "welcome to the medical guide page, Here you will find useful info.",
    children: [
      {
        title: "Guide1",
        body: "Guide 1 tutorial test",
        key: "4"
      },
      {
        title: "Guide2",
        body: "Guide 2 tutorial test 2",
        key: "5"
      }
    ],
    key: "1"
  },
  {
    title: "Medical Quizz",
    body:
      "This is the quizz page, you can test your conditions and see what is best for you to do.",
    children: [
      {
        title: "Quizz 1",
        body: "Quizz 1 test",
        key: "4"
      }
    ],
    key: "2"
  },
  {
    title: "About the project",
    body:
      "We are E-Resamont, a project that helps people getting to know risks and dangers at high altitude.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n test \n\n\n\n\n\n\n\n\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
    children: null,
    key: "3"
  }
];
// <View style={globalStyles.container}>
//   <FlatList
//     data={pages}
//     renderItem={({ item }) => (
//       <TouchableOpacity onPress={() => navigation.push("SubScreen", item)}>
//         <Text style={globalStyles.titleText}>{item.title}</Text>
//       </TouchableOpacity>
//     )}
//   />
// </View>
