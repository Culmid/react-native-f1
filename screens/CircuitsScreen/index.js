import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";

export default function CircuitsScreen() {
  const [circuits, setCircuits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const renderCircuit = ({ item }) => {
    const country = countries.find(
      (country) =>
        country.Name == item.Location.country ||
        country.CCA2 == item.Location.country ||
        country.CCA3 == item.Location.country ||
        shortenCountryName(country.Name) == item.Location.country
    );

    console.log(item);
    return (
      <View style={style.circuitContainer}>
        <View style={style.circuitHeader}>
          <Text style={style.circuitName}>{item.circuitName}</Text>
          {country && <Flag code={country.CCA2} size={24} />}
        </View>
        <Text style={style.local}>{item.Location.locality}</Text>
        <Text style={style.country}>{item.Location.country}</Text>
      </View>
    );
  };

  function shortenCountryName(countryName) {
    return countryName
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  useEffect(() => {
    async function doFetchCircuits() {
      try {
        const data = await fetch("https://ergast.com/api/f1/circuits.json");
        const json = await data.json();

        setCircuits(json.MRData.CircuitTable.Circuits);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      // For testing - TODO:Remove
      doFetchCircuits();
    }, 5000);
  }, []);

  return (
    <View style={style.circuitsContainer}>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <FlatList
          data={circuits}
          renderItem={renderCircuit}
          keyExtractor={(circuit) => circuit.circuitId}
          extraData={circuits}
          style={style.circuitsList}
        />
      )}
    </View>
  );
}
