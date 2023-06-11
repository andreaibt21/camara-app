import React from "react";
import { Dimensions, ImageBackground, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const win = Dimensions.get("window");

  setTimeout(() => {
    navigation.replace("Inicio");
  }, 3000);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFE079" }}>
      <ImageBackground
        source={require("../../assets/splash.gif")}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SplashScreen;
