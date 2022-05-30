import ConstructorInfo from "../../components/ConstructorInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

/**
 * Constructors page component to display lists of f1 constructors.
 * @param {Object} props Properties containing navigation information.
 * @returns Constructors screen displaying a breakdown of constructors.
 */
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
