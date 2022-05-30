import GenericSingleInfoPage from "../../components/GenericSingleInfoPage";
import SingleCircuitInfo from "../../components/SingleCircuitInfo";

/**
 * Singular circuit page to be shown when the CircuitsScreen FlatList is clicked.
 * @param {Object} props Properties containing the circuitId and routing information.
 * @returns Singular circuit page.
 */
export default function CircuitScreen(props) {
  const content = (circuit, imgPath) => (
    <SingleCircuitInfo circuit={circuit} imgPath={imgPath} />
  );

  return <GenericSingleInfoPage {...props} content={content} type="Circuit" />;
}
