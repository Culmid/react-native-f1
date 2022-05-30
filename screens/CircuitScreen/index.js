import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SingleCircuitInfo from "../../components/SingleCircuitInfo";
import { fetchWikiImgUrl } from "../../utils/utils";

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
          <SingleCircuitInfo circuit={circuit} imgPath={imgPath} />
          <Button title="Back" color="orange" onPress={navigateCircuits} />
        </>
      )}
    </ScreenContainer>
  );
}
