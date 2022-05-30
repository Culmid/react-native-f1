import { View, Text } from "react-native";
import Flag from "react-native-flags";
import style from "./style";
import { getCountryByNationality } from "../../utils/utils";

export default function ConstructorInfo({ constructor }) {
  const country = getCountryByNationality(constructor.nationality);

  return (
    <View style={style.constructorContainer}>
      <View style={style.constructorHeader}>
        <Text style={style.constructorName}>{constructor.name}</Text>
        {country && <Flag code={country.CCA2} size={24} />}
      </View>
      <Text style={style.nationality}>{constructor.nationality}</Text>
    </View>
  );
}
