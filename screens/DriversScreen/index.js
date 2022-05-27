import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";

import ScreenContainer from "../../components/ScreenContainer";
import DriverInfo from "../../components/DriverInfo";

export default function DriversScreen({ navigation }) {
  const [drivers, setDrivers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);

  function navigateDriver(driverId) {
    navigation.navigate("Driver", { driverId });
  }

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
          <Text style={style.headerText}>Drivers</Text>
          <FlatList
            data={drivers}
            renderItem={({ item }) => (
              <DriverInfo driver={item} navigateDriver={navigateDriver} />
            )}
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
            <Text style={{ fontWeight: "700" }}>
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
