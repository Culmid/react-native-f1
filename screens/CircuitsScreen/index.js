import CircuitInfo from "../../components/CircuitInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

export default function CircuitsScreen({ navigation }) {
  function navigateCircuit(circuitId) {
    navigation.navigate("Circuit", { circuitId });
  }

  const renderItem = ({ item }) => (
    <CircuitInfo circuit={item} navigateCircuit={navigateCircuit} />
  );

  return <GenericInfoPage type="Circuits" renderItem={renderItem} />;
}
