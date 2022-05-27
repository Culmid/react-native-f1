import { View, Text } from "react-native";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import style from "./style";

export default function CircuitInfo({ circuit }) {
  const country = countries.find(
    (country) =>
      country.Name == circuit.Location.country ||
      country.CCA2 == circuit.Location.country ||
      country.CCA3 == circuit.Location.country ||
      shortenCountryName(country.Name) == circuit.Location.country
  );

  return (
    <View style={style.circuitContainer}>
      <View style={style.circuitHeader}>
        <Text style={style.circuitName}>{circuit.circuitName}</Text>
        {country && <Flag code={country.CCA2} size={24} />}
      </View>
      <Text style={style.local}>{circuit.Location.locality}</Text>
      <Text style={style.country}>{circuit.Location.country}</Text>
    </View>
  );
}

function shortenCountryName(countryName) {
  return countryName
    .split(" ")
    .map((word) => word[0])
    .join("");
}
