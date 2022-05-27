import { Pressable, View, Text } from "react-native";
import countries from "../../assets/countries.json";
import Flag from "react-native-flags";
import style from "./style";

export default function DriverInfo({ driver, navigateDriver }) {
  const country = countries.find(
    (country) => country.Nationality == driver.nationality
  );

  return (
    <Pressable onPress={() => navigateDriver(driver.driverId)}>
      <View style={style.driverContainer}>
        <View style={style.driverHeader}>
          <Text style={style.driverHeaderText}>
            {driver.givenName} {driver.familyName}
          </Text>
          <View style={style.driverHeaderDecoration}>
            <Text style={style.driverHeaderText}>
              {driver.code} {driver.permanentNumber}{" "}
            </Text>
            {country && <Flag code={country.CCA2} size={24} />}
          </View>
        </View>
        <Text style={style.dob}>{driver.dateOfBirth}</Text>
        <Text style={style.nationality}>{driver.nationality}</Text>
      </View>
    </Pressable>
  );
}
