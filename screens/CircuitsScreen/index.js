import CircuitInfo from "../../components/CircuitInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

/**
 * Circuits page component to display lists of f1 circuits.
 * @param {Object} props Properties containing navigation information.
 * @returns Circuits screen displaying a breakdown of circuits.
 */
export default function CircuitsScreen({ navigation }) {
  function navigateCircuit(circuitId) {
    navigation.navigate("Circuit", { circuitId });
  }

  const renderItem = ({ item }) => (
    <CircuitInfo circuit={item} navigateCircuit={navigateCircuit} />
  );

  return <GenericInfoPage type="Circuits" renderItem={renderItem} />;
}
