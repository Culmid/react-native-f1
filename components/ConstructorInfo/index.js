import { View, Text, Pressable } from "react-native";
import Flag from "react-native-flags";
import style from "./style";
import { getCountryByNationality } from "../../utils/utils";

/**
 * Constructor information display, simplified for a list.
 * @param {Object} props Properties containing the constructor information and routing to the singular constructor page.
 * @returns Pressable constructor information display for the FlatList on ConstructorsScreen.
 */
export default function ConstructorInfo({ constructor, navigateConstructor }) {
  const country = getCountryByNationality(constructor.nationality);

  return (
    <Pressable onPress={() => navigateConstructor(constructor.constructorId)}>
      <View style={style.constructorContainer}>
        <View style={style.constructorHeader}>
          <Text style={style.constructorName}>{constructor.name}</Text>
          {country && <Flag code={country.CCA2} size={24} />}
        </View>
        <Text style={style.nationality}>{constructor.nationality}</Text>
      </View>
    </Pressable>
  );
}
