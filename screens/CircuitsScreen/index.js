import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import ScreenContainer from "../../components/ScreenContainer";
import CircuitInfo from "../../components/CircuitInfo";
import PaginationControls from "../../components/PaginationControls";

export default function CircuitsScreen() {
  const [circuits, setCircuits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);

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
            renderItem={({ item }) => <CircuitInfo circuit={item} />}
            keyExtractor={(circuit) => circuit.circuitId}
            extraData={circuits}
            style={style.circuitsList}
          />
          <PaginationControls
            offset={offset}
            total={total}
            onPrevPress={onPrevPress}
            onNextPress={onNextPress}
          />
        </>
      )}
    </ScreenContainer>
  );
}
