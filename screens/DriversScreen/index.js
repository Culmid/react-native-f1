import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";

export default function DriversScreen() {
  const [drivers, setDrivers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    async function doFetchDrivers() {
      try {
        const data = await fetch("https://ergast.com/api/f1/drivers.json");
        const json = await data.json();

        setDrivers(json.MRData.DriverTable.Drivers);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      // For testing - TODO:Remove
      doFetchDrivers();
    }, 5000);
  }, []);

  return (
    <View style={style.driversContainer}>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <FlatList
          data={drivers}
          renderItem={renderDriver}
          keyExtractor={(driver) => driver.driverId}
          extraData={drivers}
          style={style.driversList}
        />
      )}
    </View>
  );
}
