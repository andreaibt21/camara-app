import React, { useCallback, useState } from "react";

// import {
//     StyledLinearGradient,
//     StyledMargin,
//     StyledView,
// } from "./GraphicScreen.styled";
// import { useDispatch, useSelector } from "react-redux";
// import { AuthTypes, refreshUserData } from "../../../redux/authReducer";
// import { IStore } from "../../../redux/store";
// import { StyledParagraph } from "../../atoms/Paragraph/Paragraph.styled";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db, auth, storage } from "../database/firebase";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
// import { fetchLoadingFinish, fetchLoadingStart } from "../../../redux/loaderReducer";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Text, ImageBackground, TouchableOpacity, View } from "react-native";
import styles from "../styles/Style";
import { getDownloadURL, ref } from "firebase/storage";

const GraphicScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // const data: AuthTypes = useSelector<IStore, any>(store => store.auth);
  // const dispatch = useDispatch();
  //const fill = 'rgb(134, 65, 244)'

  const [arrNice, setArrNice] = useState([]);
  const [arrMessy, setArrMessy] = useState([
    {
      labels: [""],
      datasets: [
        {
          data: [0],
        },
        {
          data: [0], // min
        },
        {
          data: [5], // max
        },
      ],
    },
  ]);

  const handlerBack = () => {
    navigation.replace("Home");
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      getNiceFotos()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
      getMessyFotos()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    }, [])
  );

  const onRefresh = () => {
    // dispatch(refreshUserData());
  };
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  const getNiceFotos = async () => {
    try {
      resetData();
      const querySnapshot = await await getDocs(
        query(collection(db, "images"), orderBy("creationDate", "desc"))
      );
      //declaramos un array
      let fotosNice: any = [];
      let contador: number = 0;

      querySnapshot.forEach(async (doc) => {
        //llenamos el array de cosos
        // dispatch(fetchLoadingStart());
        contador = contador + 1;

        if (doc.data().type === "nice") {
          //console.log("holiii");
          //console.log(doc.data().votes.length);
          fotosNice.push({
            //name: doc.data().image,
            name: "-Foto n." + contador,
            amount: doc.data().votes.length,
            color: generateColor(),
            legendFontColor: "black",
            legendFontSize: 15,
          });
        }
      });
      setArrNice(fotosNice);

      // setPromedio(food / promedioDeEncuestas);
    } catch (error) {
      console.log(error);
    } finally {
      //dispatch(fetchLoadingFinish());
    }
  };

  const resetData = () => {
    setArrNice([]);
    //setArrMessy([]);
  };
  const getMessyFotos = async () => {
    try {
      resetData();
      const querySnapshot = await await getDocs(
        query(collection(db, "images"), orderBy("creationDate", "desc"))
      );
      let etiqueta: any = [];
      let datos: any = [];
      let fotos: any = [];
      let contador: number = 0;

      querySnapshot.forEach(async (doc) => {
        //llenamos el array de cosos
        // dispatch(fetchLoadingStart());
        contador = contador + 1;

        if (doc.data().type === "messy") {
          //console.log("holiii");
          //console.log(doc.data().votes.length);
          //etiqueta.push(doc.data().image);

          // const res:any = {...doc.data(), id:doc.id};
          // const imageUrl = await getDownloadURL(ref(storage, res.image));
          // console.log(imageUrl);
          etiqueta.push("Foto n.", contador);
          datos.push(doc.data().votes.length);
        }
      });

      console.log(etiqueta);
      console.log(datos);

      setArrMessy([
        {
          labels: etiqueta,
          datasets: [
            {
              data: datos,
            },
            {
              data: [0], // min
            },
            {
              data: [5], // max
            },
          ],
        },
      ]);

      // setPromedio(food / promedioDeEncuestas);
    } catch (error) {
      console.log(error);
    } finally {
      //dispatch(fetchLoadingFinish());
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.png")}
      resizeMode="repeat"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.chartPie}>
          <Text style={[styles.TextCharts, { marginBottom: 20 }]}>
            COSAS LINDAS
          </Text>
          <PieChart
            data={arrNice}
            width={350}
            height={150}
            backgroundColor="transparent"
            chartConfig={{
              backgroundGradientFrom: "#72a7e8",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#89b3e8",
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
            }}
            accessor={"amount"}
            paddingLeft={"0"}
            center={[50, 0]}
            absolute
          />
        </View>
        <View style={styles.chartBars}>
          <Text
            style={[styles.TextCharts, { color: "#218154", marginBottom: 20 }]}
          >
            COSAS FEAS
          </Text>

          <BarChart
            data={arrMessy[0]}
            yAxisLabel=""
            yAxisSuffix=""
            width={350}
            height={160}
            segments={2}
            fromZero={true}
            chartConfig={{
              backgroundGradientFrom: "#ade0db",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#ade0db",
              backgroundGradientToOpacity: 0,
              //color: (opacity = 1) => 'red',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.5,
              useShadowColorFromDataset: false, // optional
            }}
            withHorizontalLabels={true}
            flatColor={true}
            withCustomBarColorFromData={true}
          />
        </View>

        {
          <TouchableOpacity
            onPress={handlerBack}
            style={[styles.button, styles.button]}
          >
            <View>
              <Text style={styles.buttonText}>VOLVER</Text>
            </View>
          </TouchableOpacity>
        }
      </View>
    </ImageBackground>
  );
};
export default GraphicScreen;
