import GenericSingleInfoPage from "../../components/GenericSingleInfoPage";
import SingleConstructorInfo from "../../components/SingleConstructorInfo";

/**
 * Singular constructor page to be shown when the ConstructorsScreen FlatList is clicked.
 * @param {Object} props Properties containing the constructorId and routing information.
 * @returns Singular constructor page.
 */
export default function ConstructorScreen(props) {
  const content = (constructor, imgPath) => (
    <SingleConstructorInfo constructor={constructor} imgPath={imgPath} />
  );

  return (
    <GenericSingleInfoPage {...props} content={content} type="Constructor" />
  );
}
