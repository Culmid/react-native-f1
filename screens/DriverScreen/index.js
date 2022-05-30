import GenericSingleInfoPage from "../../components/GenericSingleInfoPage";
import SingleDriverInfo from "../../components/SingleDriverInfo";

/**
 * Singular driver page to be shown when the DriversScreen FlatList is clicked.
 * @param {Object} props Properties containing the driverId and routing information.
 * @returns Singular driver page.
 */
export default function DriverScreen(props) {
  const content = (driver, imgPath) => (
    <SingleDriverInfo driver={driver} imgPath={imgPath} />
  );

  return <GenericSingleInfoPage {...props} content={content} type="Driver" />;
}
