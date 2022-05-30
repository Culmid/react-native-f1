import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import style from "./style";
import Flag from "react-native-flags";
import { getCountryByCountry, fetchWikiImgUrl } from "../../utils/utils";

/**
 * Singular circuit page to be shown when the CircuitsScreen FlatList is clicked.
 * @param {Object} props Properties containing the circuitId and routing information.
 * @returns Singular circuit page.
 */
export default function CircuitScreen(props) {
  const circuitId = props.route.params.circuitId;
  const [circuit, setCircuit] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  function CircuitComponent() {
    const country = getCountryByCountry(circuit.Location.country);

    return (
      <View style={style.container}>
        <Text style={style.headerText}>{circuit.circuitName}</Text>
        {country && <Flag code={country.CCA2} size={48} />}
        <Text style={style.italics}>{circuit.Location.locality}</Text>
        <Text style={style.bold}>{circuit.Location.country}</Text>
        <Text style={style.italics}>
          Latitude, Longitude: {circuit.Location.lat}, {circuit.Location.long}
        </Text>
        {imgPath ? (
          <Image
            style={{ flex: 1, width: "100%", height: "auto" }}
            source={{
              uri: imgPath,
            }}
            resizeMode="center"
          />
        ) : null}
      </View>
    );
  }

  function navigateCircuits() {
    props.navigation.navigate("CircuitsNavigator");
  }

  useEffect(() => {
    async function doFetchCircuit() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/circuits/${circuitId}.json`
        );
        const json = await data.json();

        setCircuit(json.MRData.CircuitTable.Circuits[0]);

        const wikiImgUrl = await fetchWikiImgUrl(
          json.MRData.CircuitTable.Circuits[0].url
        );

        if (wikiImgUrl) {
          setImgPath(wikiImgUrl[0]);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchCircuit();
  }, []);

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          <CircuitComponent />
          <Button title="Back" color="orange" onPress={navigateCircuits} />
        </>
      )}
    </ScreenContainer>
  );
}
