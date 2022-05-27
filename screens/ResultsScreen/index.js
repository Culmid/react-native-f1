import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import ScreenContainer from "../../components/ScreenContainer";
import ResultInfo from "../../components/ResultInfo";
import ResultHeader from "../../components/ResultHeader";

export default function ResultsScreen() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
          <ResultHeader results={results} />
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
