import ConstructorInfo from "../../components/ConstructorInfo";
import GenericInfoPage from "../../components/GenericInfoPage";

export default function ConstructorsScreen() {
  const renderItem = ({ item }) => <ConstructorInfo constructor={item} />;

  return <GenericInfoPage type="Constructors" renderItem={renderItem} />;
}
