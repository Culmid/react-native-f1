import { View, Button, Text } from "react-native";
import style from "./style";

/**
 * General pagination controls to be used on information pages.
 * @param {Object} props Properties containing the pagination information.
 * @returns Pagination component, for use at the bottom of information pages.
 */
export default function PaginationControls({
  offset,
  total,
  onPrevPress,
  onNextPress,
}) {
  return (
    <View style={style.paginationContainer}>
      <Button
        title="Previous"
        color="orange"
        onPress={onPrevPress}
        disabled={offset === 0}
      />
      <Text style={{ fontWeight: "700" }}>
        {offset}-{offset + 30 > total ? total : offset + 30}/{total}
      </Text>
      <Button
        title="Next"
        color="orange"
        onPress={onNextPress}
        disabled={offset + 30 >= total}
      />
    </View>
  );
}
