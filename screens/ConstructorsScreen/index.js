import ConstructorInfo from "../../components/ConstructorInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

export default function ConstructorsScreen({ navigation }) {
  function navigateConstructor(constructorId) {
    navigation.navigate("Constructor", { constructorId });
  }

  const renderItem = ({ item }) => (
    <ConstructorInfo
      constructor={item}
      navigateConstructor={navigateConstructor}
    />
  );

  return <GenericInfoPage type="Constructors" renderItem={renderItem} />;
}
