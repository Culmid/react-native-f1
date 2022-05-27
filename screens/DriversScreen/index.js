import DriverInfo from "../../components/DriverInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

export default function DriversScreen({ navigation }) {
  function navigateDriver(driverId) {
    navigation.navigate("Driver", { driverId });
  }

  const renderItem = ({ item }) => (
    <DriverInfo driver={item} navigateDriver={navigateDriver} />
  );

  return <GenericInfoPage type="Drivers" renderItem={renderItem} />;
}
