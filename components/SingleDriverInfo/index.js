import { View, Text, Image } from "react-native";
import Flag from "react-native-flags";
import { getCountryByNationality } from "../../utils/utils";
import style from "./style";

export default function SingleDriverInfo({ driver, imgPath }) {
  const country = getCountryByNationality(driver.nationality);

  return (
    <View style={style.driverContainer}>
      <Text style={style.driverHeaderText}>
        {driver.givenName} {driver.familyName}
      </Text>
      {driver.code && (
        <Text style={style.driverSubHeaderText}>
          {driver.code} {driver.permanentNumber}
        </Text>
      )}

      {country && <Flag code={country.CCA2} size={48} />}
      <Text style={style.dob}>{driver.dateOfBirth}</Text>
      <Text style={style.nationality}>{driver.nationality}</Text>
      {imgPath ? (
        <Image
          style={{ flex: 1, width: "100%", borderRadius: 10 }}
          source={{
            uri: imgPath,
          }}
        />
      ) : null}
    </View>
  );
}
