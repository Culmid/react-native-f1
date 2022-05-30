import { View } from "react-native";
import style from "./style";

/**
 * General screen container to wrap all pages, mainly for styling purposes.
 * @param {Object} props Properties containing the children to be displayed in the container.
 * @returns General page view wrapping children.
 */
export default function ScreenContainer({ children }) {
  return <View style={style.screenContainer}>{children}</View>;
}
