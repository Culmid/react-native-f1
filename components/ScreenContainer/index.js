import { View } from "react-native";
import style from "./style";

export default function ScreenContainer({ children }) {
  return <View style={style.screenContainer}>{children}</View>;
}
