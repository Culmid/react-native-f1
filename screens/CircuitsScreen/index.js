import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import ScreenContainer from "../../components/ScreenContainer";

export default function CircuitsScreen() {
  const [circuits, setCircuits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);

  const renderCircuit = ({ item }) => {
    const country = countries.find(
      (country) =>
        country.Name == item.Location.country ||
        country.CCA2 == item.Location.country ||
        country.CCA3 == item.Location.country ||
        shortenCountryName(country.Name) == item.Location.country
    );

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
    setIsError(false);
    setIsLoading(true);

    async function doFetchCircuits() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/circuits.json?offset=${offset}`
        );
        const json = await data.json();

        setCircuits(json.MRData.CircuitTable.Circuits);
        setTotal(json.MRData.total);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    doFetchCircuits();
  }, [offset]);

  function onPrevPress() {
    setOffset((offset) => (offset - 30 > -1 ? offset - 30 : offset));
  }

  function onNextPress() {
    setOffset((offset) => (offset + 30 < total ? offset + 30 : offset));
  }

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          <Text style={style.headerText}>Circuits</Text>
          <FlatList
            data={circuits}
            renderItem={renderCircuit}
            keyExtractor={(circuit) => circuit.circuitId}
            extraData={circuits}
            style={style.circuitsList}
          />
          <View style={style.paginationContainer}>
            <Button
              title="Previous"
              color="orange"
              onPress={onPrevPress}
              disabled={offset === 0}
            />
            <Text style={{ fontWeight: "700" }}>
              {offset}-{offset + 30 > total ? total : offset + 30}/{total}
            </Text>
            <Button
              title="Next"
              color="orange"
              onPress={onNextPress}
              disabled={offset + 30 >= total}
            />
          </View>
        </>
      )}
    </ScreenContainer>
  );
}
