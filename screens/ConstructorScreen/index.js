import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Image, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import style from "./style";
import Flag from "react-native-flags";
import { getCountryByNationality } from "../../utils/utils";

/**
 * Singular constructor page to be shown when the ConstructorsScreen FlatList is clicked.
 * @param {Object} props Properties containing the constructorId and routing information.
 * @returns Singular constructor page.
 */
export default function ConstructorScreen(props) {
  const constructorId = props.route.params.constructorId;
  const [constructor, setConstructor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  function ConstructorComponent() {
    const country = getCountryByNationality(constructor.nationality);

    return (
      <View style={style.container}>
        <Text style={style.headerText}>{constructor.name}</Text>
        {country && <Flag code={country.CCA2} size={48} />}
        <Text style={style.bold}>{constructor.nationality}</Text>
        {imgPath ? (
          <Image
            style={{ flex: 1, width: "100%", height: "auto" }}
            source={{
              uri: imgPath,
            }}
            resizeMode="center"
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
      return text.match(
        /https:\/\/upload.wikimedia.org\/\S+\.(?:jpg|gif|png)/gi
      );
    } catch (err) {
      console.log("Failed to fetch page: ", err);
    }
  }

  function navigateConstructors() {
    props.navigation.navigate("ConstructorsNavigator");
  }

  useEffect(() => {
    async function doFetchConstructor() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/constructors/${constructorId}.json`
        );
        const json = await data.json();

        setConstructor(json.MRData.ConstructorTable.Constructors[0]);

        const wikiImgUrl = await fetchWikiImgUrl(
          json.MRData.ConstructorTable.Constructors[0].url
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
    doFetchConstructor();
  }, []);

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          <ConstructorComponent />
          <Button title="Back" color="orange" onPress={navigateConstructors} />
        </>
      )}
    </ScreenContainer>
  );
}
