import { Text, ActivityIndicator, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import style from "./style";

import ScreenContainer from "../../components/ScreenContainer";
import PaginationControls from "../../components/PaginationControls";

/**
 * A template component for information pages, meant to reduce duplication between information pages.
 * @param {Object} props Properties containing the type of information page and the item to be rendered in the FlatList.
 * @returns The filled in template of a GenericInfoPage, to be used elsewhere.
 */
export default function GenericInfoPage({ type, renderItem }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(180);
  const singularType = type.slice(0, type.length - 1);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    async function doFetchData() {
      try {
        const data = await fetch(
          `https://ergast.com/api/f1/${type.toLowerCase()}.json?offset=${offset}`
        );
        const json = await data.json();

        setData(json.MRData[`${singularType}Table`][type]);
        setTotal(json.MRData.total);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    doFetchData();
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
          <Text style={style.headerText}>{type}</Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item[`${singularType.toLowerCase()}Id`]}
            extraData={data}
            style={style.infoList}
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
