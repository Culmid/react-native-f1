import { View, Text } from "react-native";
import Flag from "react-native-flags";
import style from "./style";
import { getCountryByCountry } from "../../utils/utils";

export default function CircuitInfo({ circuit }) {
  const country = getCountryByCountry(circuit.Location.country);

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
