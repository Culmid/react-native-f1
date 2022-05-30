import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import countries from "../../assets/countries.json";
import style from "./style";
import Flag from "react-native-flags";
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

  function DriverComponent() {
    const country = countries.find(
      (country) => country.Nationality == driver.nationality
    );

    return (
      <View style={style.driverContainer}>
        <Text style={style.driverHeaderText}>
          {driver.givenName} {driver.familyName}
        </Text>
        {driver.code && (
          <Text style={style.driverSubHeaderText}>
            {driver.code} {driver.permanentNumber}
          </Text>
        )}

        {country && <Flag code={country.CCA2} size={48} />}
        <Text style={style.dob}>{driver.dateOfBirth}</Text>
        <Text style={style.nationality}>{driver.nationality}</Text>
        {imgPath ? (
          <Image
            style={{ flex: 1, width: "100%", borderRadius: 10 }}
            source={{
              uri: imgPath,
            }}
          />
        ) : null}
      </View>
    );
  }

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
          <DriverComponent />
          <Button title="Back" color="orange" onPress={navigateDrivers} />
        </>
      )}
    </ScreenContainer>
  );
}
