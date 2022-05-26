import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import ScreenContainer from "../../components/ScreenContainer";

export default function ConstructorsScreen() {
  const [constructors, setConstructors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const renderConstructors = ({ item }) => {
    const country = countries.find(
      (country) => country.Nationality == item.nationality
    );

    console.log(item);
    return (
      <View style={style.constructorContainer}>
        <View style={style.constructorHeader}>
          <Text style={style.constructorName}>{item.name}</Text>
          {country && <Flag code={country.CCA2} size={24} />}
        </View>
        <Text style={style.nationality}>{item.nationality}</Text>
      </View>
    );
  };

  useEffect(() => {
    async function doFetchConstructors() {
      try {
        const data = await fetch("https://ergast.com/api/f1/constructors.json");
        const json = await data.json();

        setConstructors(json.MRData.ConstructorTable.Constructors);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchConstructors();
  }, []);

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <FlatList
          data={constructors}
          renderItem={renderConstructors}
          keyExtractor={(constructor) => constructor.constructorId}
          extraData={constructors}
          style={style.constructorsList}
        />
      )}
    </ScreenContainer>
  );
}
