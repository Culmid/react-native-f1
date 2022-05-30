import DriverInfo from "../../components/DriverInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

/**
 * Drivers page component to display lists of f1 drivers.
 * @param {Object} props Properties containing navigation information.
 * @returns Drivers screen displaying a breakdown of drivers.
 */
export default function DriversScreen({ navigation }) {
  function navigateDriver(driverId) {
    navigation.navigate("Driver", { driverId });
  }

  const renderItem = ({ item }) => (
    <DriverInfo driver={item} navigateDriver={navigateDriver} />
  );

  return <GenericInfoPage type="Drivers" renderItem={renderItem} />;
}
