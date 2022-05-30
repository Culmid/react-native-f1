import { Pressable, View, Text } from "react-native";
import Flag from "react-native-flags";
import style from "./style";
import { getCountryByNationality } from "../../utils/utils";

/**
 * Driver information display, simplified for a list.
 * @param {Object} props Properties containing the driver information and routing to the singular driver page.
 * @returns Pressable driver information display for the FlatList on DriversScreen.
 */
export default function DriverInfo({ driver, navigateDriver }) {
  const country = getCountryByNationality(driver.nationality);

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
