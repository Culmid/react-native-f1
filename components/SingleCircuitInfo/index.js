import { View, Image, Text } from "react-native";
import style from "./style";
import Flag from "react-native-flags";
import { getCountryByCountry } from "../../utils/utils";

/**
 * Information for single circuit page.
 * @param {Object} props Properties containing circuit information and path to the wiki picture.
 * @returns Information component for single circuit page.
 */
export default function SingleCircuitInfo({ circuit, imgPath }) {
  const country = getCountryByCountry(circuit.Location.country);

  return (
    <View style={style.container}>
      <Text style={style.headerText}>{circuit.circuitName}</Text>
      {country && <Flag code={country.CCA2} size={48} />}
      <Text style={style.italics}>{circuit.Location.locality}</Text>
      <Text style={style.bold}>{circuit.Location.country}</Text>
      <Text style={style.italics}>
        Latitude, Longitude: {circuit.Location.lat}, {circuit.Location.long}
      </Text>
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
