import CircuitInfo from "../../components/CircuitInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

export default function CircuitsScreen() {
  const renderItem = ({ item }) => <CircuitInfo circuit={item} />;

  return <GenericInfoPage type="Circuits" renderItem={renderItem} />;
}
