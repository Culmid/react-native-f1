import { View, Text, ActivityIndicator, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import ScreenContainer from "../../components/ScreenContainer";
import ConstructorInfo from "../../components/ConstructorInfo";

export default function ConstructorsScreen() {
  const [constructors, setConstructors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    async function doFetchConstructors() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/constructors.json?offset=${offset}`
        );
        const json = await data.json();

        setConstructors(json.MRData.ConstructorTable.Constructors);
        setTotal(json.MRData.total);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchConstructors();
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
          <Text style={style.headerText}>Constructors</Text>
          <FlatList
            data={constructors}
            renderItem={({ item }) => <ConstructorInfo constructor={item} />}
            keyExtractor={(constructor) => constructor.constructorId}
            extraData={constructors}
            style={style.constructorsList}
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
