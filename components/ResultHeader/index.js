import { View, Text } from "react-native";
import Flag from "react-native-flags";
import { getCountryByCountry } from "../../utils/utils";
import style from "./style";

/**
 * Header component meant for usage on the ResultsScreen.
 * @param {Object} props Properties containing the information about recent race results.
 * @returns Header component for use on the ResultsScreen.
 */
export default function ResultHeader({ results }) {
  const country = getCountryByCountry(results.Circuit.Location.country);

  return (
    <View style={style.raceHeader}>
      <Text style={style.raceName}>{results.raceName}</Text>
      {country && <Flag code={country.CCA2} size={48} />}
      <Text style={style.raceDate}>{results.date}</Text>
      <Text style={style.raceInfo}>
        <Text style={style.bold}>Round:</Text> {results.round}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View style={style.raceLocationContainer}>
          <Text style={style.raceLocationHeader}>Location:</Text>
          <Text style={style.raceLocationText}>
            {results.Circuit.circuitName},{"\n"}
            {results.Circuit.Location.locality},{"\n"}
            {results.Circuit.Location.country}
          </Text>
        </View>
      </View>
    </View>
  );
}

function shortenCountryName(countryName) {
  return countryName
    .split(" ")
    .map((word) => word[0])
    .join("");
}
