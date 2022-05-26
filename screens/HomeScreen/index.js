import { View, Text, ImageBackground } from "react-native";
import style from "./style";
import ScreenContainer from "../../components/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <ImageBackground
        source={require("../../assets/aryton.jpg")}
        resizeMode="cover"
        style={style.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <Text style={style.text}>Welcome to React Native F1</Text>
      </ImageBackground>
    </ScreenContainer>
  );
}
