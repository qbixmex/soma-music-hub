import { getCategories } from "@/actions";
import CategoriesList from "./(components)/categories-list";

const CategoriesPage = async () => {
  const { categories } = await getCategories();

  return (
    <CategoriesList categories={categories} />
  );
};

export default CategoriesPage;
