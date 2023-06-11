import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Stack, FAB } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlerLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any }) => {
        navigation.replace("Home");
        const user = userCredential.user;
        console.log("Logged in with", user.email);
      })
      .catch((error) => {
        console.log(error.message);
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-not-found":
          case "auth/wrong-password":
          case "auth/internal-error":
          case "auth/too-many-requests":
            setMessageError("Credenciales inválidas");
            break;
          default:
            setMessageError(error.message);
            break;
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const setMessageError = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const adminLogin = () => {
    setVisible(!visible);
    setEmail("admin@admin.com");
    setPassword("111111");
  };
  const guestLogin = () => {
    setVisible(!visible);
    setEmail("invitado@invitado.com");
    setPassword("222222");
  };

  const supplierLogin = () => {
    setVisible(!visible);
    setEmail("usuario@usuario.com");
    setPassword("333333");
  };
  const anonimoLogin = () => {
    setVisible(!visible);
    setEmail("anonimo@anonimo.com");
    setPassword("444444");
  };
  const testerLogin = () => {
    setVisible(!visible);
    setEmail("tester@tester.com");
    setPassword("555555");
  };

  const handlerBack = () => {
    navigation.replace("Inicio");
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinContainer}>
            <Spinner visible={loading} textStyle={styles.spinnerTextStyle} />
          </View>
        )}
        <Image
          source={require("../assets/icon.png")}
          resizeMode="contain"
          style={styles.logo}
        />

        <View style={styles.inputContainer}>
          {!!message ? (
            <TouchableOpacity
              style={styles.buttonError}
              onPress={() => setMessage("")}
            >
              <Text style={[styles.buttonText, { color: "red" }]}>
                {message}
              </Text>
            </TouchableOpacity>
          ) : null}

          <TextInput
            placeholder="Correo electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handlerLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Volver</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: "absolute",
            padding: 20,
            right: -10,
            bottom: 70,
            display: "flex",
          }}
        >
          <View>
            <FAB
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="extended"
              label="Administrador"
              onPress={adminLogin}
              visible={visible}
              color="#E98B1B"
            />
          </View>
          <View>
            <FAB
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="extended"
              label="Invitado"
              color="#E98B1B"
              onPress={guestLogin}
              visible={visible}
            />
          </View>
          <View>
            <FAB
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="extended"
              label="Usuario"
              color="#E98B1B"
              onPress={supplierLogin}
              visible={visible}
            />
          </View>
          <View>
            <FAB
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="extended"
              label="Anónimo"
              color="#E98B1B"
              onPress={anonimoLogin}
              visible={visible}
            />
          </View>
          <View>
            <FAB
              style={{
                margin: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              variant="extended"
              label="Tester"
              color="#E98B1B"
              onPress={testerLogin}
              visible={visible}
            />
          </View>
        </View>
        <View
          style={{
            bottom: -60,
            left: 150,
          }}
        >
          <FAB
            color="#E98B1B"
            icon={(props) => (
              <Icon
                name="account"
                {...props}
                color="#218154"
                onPress={() => setVisible(!visible)}
              />
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;
