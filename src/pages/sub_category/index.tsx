import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SubCategoriesFromDB } from "schemas/subCategorySchema";
import { getItem } from "api/api";
import ItemSubCategory from "components/Items/ItemSubCategory";

const Products = () => {
  const { data: subCategories, isLoading: isLoadingSubCategory } = useQuery<
    SubCategoriesFromDB[]
  >({
    queryKey: ["subCategories"],
    queryFn: () => getItem("/sub-categories"),
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {subCategories ? (
        subCategories.map((i: SubCategoriesFromDB) => (
          <ItemSubCategory key={i._id} item={i} />
        ))
      ) : (
        <>error</>
      )}
      <ButtonGroup>
        <Link href={"/sub_category/add"}>
          <Button colorScheme={"green"}>Agregar productos</Button>
        </Link>

        <Link href={"/"}>
          <Button colorScheme={"gray"}>Volver </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default Products;
