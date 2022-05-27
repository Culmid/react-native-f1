import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import ScreenContainer from "../../components/ScreenContainer";

export default function DriversScreen() {
  const [drivers, setDrivers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);

  const renderDriver = ({ item }) => {
    const country = countries.find(
      (country) => country.Nationality == item.nationality
    );

    return (
      <View style={style.driverContainer}>
        <View style={style.driverHeader}>
          <Text style={style.driverHeaderText}>
            {item.givenName} {item.familyName}
          </Text>
          <View style={style.driverHeaderDecoration}>
            <Text style={style.driverHeaderText}>
              {item.code} {item.permanentNumber}{" "}
            </Text>
            {country && <Flag code={country.CCA2} size={24} />}
          </View>
        </View>
        <Text style={style.dob}>{item.dateOfBirth}</Text>
        <Text style={style.nationality}>{item.nationality}</Text>
      </View>
    );
  };

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    async function doFetchDrivers() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/drivers.json?offset=${offset}`
        );
        const json = await data.json();

        setDrivers(json.MRData.DriverTable.Drivers);
        setTotal(json.MRData.total);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchDrivers();
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
          <FlatList
            data={drivers}
            renderItem={renderDriver}
            keyExtractor={(driver) => driver.driverId}
            extraData={drivers}
            style={style.driversList}
          />
          <View style={style.paginationContainer}>
            <Button
              title="Previous"
              color="orange"
              onPress={onPrevPress}
              disabled={offset === 0}
            />
            <Text>
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
