import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import countries from "../../assets/countries.json";
import style from "./style";
import Flag from "react-native-flags";

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
            style={{ flex: 1, width: "100%" }}
            source={{
              uri: imgPath,
            }}
          />
        ) : null}
      </View>
    );
  }

  async function fetchWikiImgUrl(wikiUrl) {
    try {
      const response = await fetch(wikiUrl);
      const text = await response.text();

      // Return first image on wiki
      return text.match(/https:\/\/upload.wikimedia.org\/\S+\.(?:jpg|gif|png)/);
    } catch (err) {
      console.log("Failed to fetch page: ", err);
    }
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
