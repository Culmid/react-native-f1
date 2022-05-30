import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, Button } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import { fetchWikiImgUrl } from "../../utils/utils";

/**
 * Template component for single information pages.
 * @param {Object} props Properties containing type, content renderer and routing information.
 * @returns Filled in single page template.
 */
export default function GenericSingleInfoPage(props) {
  const type = props.type;
  const id = props.route.params[`${type.toLowerCase()}Id`];

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imgPath, setImgPath] = useState(null);

  function navigate() {
    props.navigation.navigate(`${type}sNavigator`);
  }

  useEffect(() => {
    async function doFetch() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/${type.toLowerCase()}s/${id}.json`
        );
        const json = await data.json();

        setData(json.MRData[`${type}Table`][`${type}s`][0]);

        const wikiImgUrl = await fetchWikiImgUrl(
          json.MRData[`${type}Table`][`${type}s`][0].url
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
    doFetch();
  }, []);

  return (
    <ScreenContainer>
      {isLoading && !isError && (
        <ActivityIndicator size="large" color="#ffa500" />
      )}
      {isError && <Text>Error, Please Refresh the App</Text>}
      {!isLoading && !isError && (
        <>
          {props.content(data, imgPath)}
          <Button title="Back" color="orange" onPress={navigate} />
        </>
      )}
    </ScreenContainer>
  );
}
