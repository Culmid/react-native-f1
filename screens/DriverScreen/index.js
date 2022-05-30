import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SingleDriverInfo from "../../components/SingleDriverInfo";
import { fetchWikiImgUrl } from "../../utils/utils";

/**
 * Singular driver page to be shown when the DriversScreen FlatList is clicked.
 * @param {Object} props Properties containing the driverId and routing information.
 * @returns Singular driver page.
 */
export default function DriverScreen(props) {
  const driverId = props.route.params.driverId;
  const [driver, setDriver] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  function navigateDrivers() {
    props.navigation.navigate("DriversNavigator");
  }

  useEffect(() => {
    async function doFetchDriver() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/drivers/${driverId}.json`
        );
        const json = await data.json();

        setDriver(json.MRData.DriverTable.Drivers[0]);

        const wikiImgUrl = await fetchWikiImgUrl(
          json.MRData.DriverTable.Drivers[0].url
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
    doFetchDriver();
  }, []);

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          <SingleDriverInfo driver={driver} imgPath={imgPath} />
          <Button title="Back" color="orange" onPress={navigateDrivers} />
        </>
      )}
    </ScreenContainer>
  );
}
