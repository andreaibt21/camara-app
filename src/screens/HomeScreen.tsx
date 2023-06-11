import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import React, { useLayoutEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  function handlerBack() {
    navigation.replace("Home");
  }
  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => {
        navigation.replace("Inicio");
      })
      .catch((error: any) => alert(error.message));
  }

  const handlerCamera = (type: string) => {
    type === "like"
      ? navigation.replace("Like")
      : navigation.replace("Dislike");
  };

  const handlerEstadistica = () => {
    navigation.replace("Chart");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonAccessCamera}>
          <TouchableOpacity onPress={handlerSingOut}>
            <FontAwesome name="power-off" size={24} color="#218154" />
          </TouchableOpacity>
        </View>
      ),

      headerTitle: () => (
        <>
          <Image
            source={require("../assets/lindo2.png")}
            resizeMode="contain"
            style={[styles.logoLike, { marginRight: 20 }]}
          />
          <Text style={[styles.textUser, { color: "#218154" }]}>
            {auth?.currentUser?.displayName?.toUpperCase()}
          </Text>
          <Image
            source={require("../assets/lindo2.png")}
            resizeMode="contain"
            style={styles.logoLike}
          />
        </>
      ),
      headerTintColor: "#B49223",
      headerTitleAlign: "center",
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: "#FFC400",
      },
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handlerCamera("like")}
          style={styles.buttonHome}
        >
          <Image
            source={require("../assets/lujo1.jpg")}
            resizeMode="contain"
            style={styles.lujoRuinas}
          />
          <View style={{ padding: 20 }}>
            <Text style={styles.buttonText}>COSAS LINDAS</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlerCamera("dislike")}
          style={[styles.buttonHome, styles.buttonOutlineRole]}
        >
          <Image
            source={require("../assets/ruinas1.jpg")}
            resizeMode="contain"
            style={styles.lujoRuinas}
          />
          <View style={{ padding: 20 }}>
            <Text style={styles.buttonOutlineTextRole}>COSAS FEAS</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;
