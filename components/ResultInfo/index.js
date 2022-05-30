import { View, Text } from "react-native";
import style from "./style";
import Flag from "react-native-flags";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { getCountryByNationality } from "../../utils/utils";

export default function ResultInfo({ result }) {
  const country = getCountryByNationality(result.Driver.nationality);
  const constructorCountry = getCountryByNationality(
    result.Constructor.nationality
  );

  const gridPos = parseInt(result.grid);
  const endPos = parseInt(result.position);
  const positionSymbol =
    gridPos > endPos
      ? ["arrow-up", "green"]
      : gridPos < endPos
      ? ["arrow-down", "red"]
      : ["equals", "black"];

  return (
    <View style={style.resultContainer}>
      <View style={style.resultHeader}>
        <Text style={style.resultHeaderText}>
          {result.positionText === "R" ? "DNF" : result.positionText}
        </Text>
        <Text style={style.resultHeaderText}>
          {result.Driver.code}-{result.number}
        </Text>
        {country && <Flag code={country.CCA2} size={24} />}
        <Text style={style.resultHeaderText}>
          {result.Driver.givenName} {result.Driver.familyName}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Text style={style.resultHeaderText}>
          {"Time" in result
            ? result.Time.time
            : result.status.includes("+")
            ? result.status
            : `DNF: ${result.status}`}
        </Text>
        <Text>
          <Text style={style.bold}>Constructor:</Text>{" "}
          {constructorCountry && (
            <Flag code={constructorCountry.CCA2} size={16} />
          )}{" "}
          {result.Constructor.name}
        </Text>
      </View>
      <Text>
        <Text style={style.bold}>Points:</Text> {result.points}
      </Text>
      <Text>
        <Text style={style.bold}>Grid Position:</Text> {result.grid}{" "}
        {
          <FontAwesome5
            name={positionSymbol[0]}
            size={16}
            color={positionSymbol[1]}
          />
        }
      </Text>
      <Text>
        <Text style={style.bold}>Fastest Lap:</Text>{" "}
        <MaterialIcons name="timer" size={16} color="black" />{" "}
        {result.FastestLap.Time.time}{" "}
        <Ionicons name="speedometer-outline" size={16} color="black" />{" "}
        {result.FastestLap.AverageSpeed.speed}{" "}
        {result.FastestLap.AverageSpeed.units}
      </Text>
    </View>
  );
}
