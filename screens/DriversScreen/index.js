import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";

import ScreenContainer from "../../components/ScreenContainer";
import DriverInfo from "../../components/DriverInfo";
import PaginationControls from "../../components/PaginationControls";

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
