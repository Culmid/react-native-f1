import { View, Text, Image } from "react-native";
import Flag from "react-native-flags";
import { getCountryByNationality } from "../../utils/utils";
import style from "./style";

/**
 * Information for single constructor page.
 * @param {Object} props Properties containing constructor information and path to the wiki picture.
 * @returns Information component for single constructor page.
 */
export default function SingleConstructorInfo({ constructor, imgPath }) {
  const country = getCountryByNationality(constructor.nationality);

  return (
    <View style={style.container}>
      <Text style={style.headerText}>{constructor.name}</Text>
      {country && <Flag code={country.CCA2} size={48} />}
      <Text style={style.bold}>{constructor.nationality}</Text>
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
