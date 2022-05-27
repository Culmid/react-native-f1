import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import ScreenContainer from "../../components/ScreenContainer";
import ResultInfo from "../../components/ResultInfo";

export default function ResultsScreen() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let country;

  function getCountry() {
    return countries.find(
      (country) =>
        country.Name == results.Circuit.Location.country ||
        country.CCA2 == results.Circuit.Location.country ||
        country.CCA3 == results.Circuit.Location.country ||
        shortenCountryName(country.Name) == results.Circuit.Location.country
    );
  }

  function shortenCountryName(countryName) {
    return countryName
      .split(" ")
      .map((word) => word[0])
      .join("");
  }

  useEffect(() => {
    async function doFetchResults() {
      try {
        const data = await fetch(
          "https://ergast.com/api/f1/current/last/results.json"
        );
        const json = await data.json();

        setResults(json.MRData.RaceTable.Races[0]);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchResults();
  }, []);

  // {"\n"} -> Super Ghetto Solution but ¯\_(ツ)_/¯
  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          <View style={style.raceHeader}>
            <Text style={style.raceName}>{results.raceName}</Text>
            {(country = getCountry()) && <Flag code={country.CCA2} size={48} />}
            <Text style={style.raceDate}>{results.date}</Text>
            <Text style={style.raceInfo}>
              <Text style={style.bold}>Round:</Text> {results.round}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={style.raceLocationContainer}>
                <Text style={style.raceLocationHeader}>Location:</Text>
                <Text style={style.raceLocationText}>
                  {results.Circuit.circuitName},{"\n"}
                  {results.Circuit.Location.locality},{"\n"}
                  {results.Circuit.Location.country}
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={results.Results}
            renderItem={({ item }) => <ResultInfo result={item} />}
            keyExtractor={(result) => result.Driver.driverId}
            extraData={results}
            style={style.resultsList}
          />
        </>
      )}
    </ScreenContainer>
  );
}
