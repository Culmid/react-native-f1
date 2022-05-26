import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function ResultsScreen() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  let country;

  const renderResults = ({ item }) => {
    const country = countries.find(
      (country) => country.Nationality == item.Driver.nationality
    );

    const constructorCountry = countries.find(
      (country) => country.Nationality == item.Constructor.nationality
    );

    const gridPos = parseInt(item.grid);
    const endPos = parseInt(item.position);
    const positionSymbol =
      gridPos > endPos
        ? ["arrow-up", "green"]
        : gridPos < endPos
        ? ["arrow-down", "red"]
        : ["equals", "black"];
    console.log(item);

    return (
      <View style={style.resultContainer}>
        <View style={style.resultHeader}>
          <Text style={style.resultHeaderText}>
            {item.positionText === "R" ? "DNF" : item.positionText}
          </Text>
          <Text style={style.resultHeaderText}>
            {item.Driver.code}-{item.number}
          </Text>
          {country && <Flag code={country.CCA2} size={24} />}
          <Text style={style.resultHeaderText}>
            {item.Driver.givenName} {item.Driver.familyName}
          </Text>
          <Text style={style.resultHeaderText}>
            {"Time" in item
              ? item.Time.time
              : item.status.includes("+")
              ? item.status
              : `DNF: ${item.status}`}
          </Text>
        </View>
        <Text style={style.dob}>
          <Text style={style.bold}>Constructor:</Text>{" "}
          {constructorCountry && (
            <Flag code={constructorCountry.CCA2} size={16} />
          )}{" "}
          {item.Constructor.name}
        </Text>
        <Text style={style.nationality}>
          <Text style={style.bold}>Points:</Text> {item.points}
        </Text>
        <Text>
          <Text style={style.bold}>Grid Position:</Text> {item.grid}{" "}
          {
            <FontAwesome5
              name={positionSymbol[0]}
              size={16}
              color={positionSymbol[1]}
            />
          }
        </Text>
        <Text>
          <Text style={style.bold}>Fastest Lap:</Text>{" "}
          <MaterialIcons name="timer" size={16} color="black" />{" "}
          {item.FastestLap.Time.time}{" "}
          <Ionicons name="speedometer-outline" size={16} color="black" />{" "}
          {item.FastestLap.AverageSpeed.speed}{" "}
          {item.FastestLap.AverageSpeed.units}
        </Text>
      </View>
    );
  };

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
    setTimeout(() => {
      // For testing - TODO:Remove
      doFetchResults();
    }, 5000);
  }, []);

  // {"\n"} -> Super Ghetto Solution but ¯\_(ツ)_/¯
  return (
    <View style={style.resultsContainer}>
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
            renderItem={renderResults}
            keyExtractor={(result) => result.Driver.driverId}
            extraData={results}
            style={style.resultsList}
          />
        </>
      )}
    </View>
  );
}
