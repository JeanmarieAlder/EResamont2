import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import { globalStyles } from "../styles/global";

export default function Home({ navigation }) {
  //This is an example of how we can use data and create buttons and pages
  const [pages, setPages] = useState([
    {
      title: "Medical Guide",
      body:
        "welcome to the medical guide page, Here you will find useful info.",
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
  ]);

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={pages}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push("SubScreen", item)}>
            <Text style={globalStyles.titleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
