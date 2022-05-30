import { View, Text, ImageBackground } from "react-native";
import style from "./style";
import ScreenContainer from "../../components/ScreenContainer";

/**
 * Home screen for the app containing a welcoming message and a picture.
 * @returns Home Screen.
 */
export default function HomeScreen() {
  return (
    <ScreenContainer>
      <ImageBackground
        source={require("../../assets/aryton.jpg")}
        resizeMode="cover"
        style={style.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={style.textContainer}>
          <Text style={style.text}>Welcome to React Native F1</Text>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
}
