import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SingleConstructorInfo from "../../components/SingleConstructorInfo";
import { fetchWikiImgUrl } from "../../utils/utils";

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
          <SingleConstructorInfo constructor={constructor} imgPath={imgPath} />
          <Button title="Back" color="orange" onPress={navigateConstructors} />
        </>
      )}
    </ScreenContainer>
  );
}
