import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { Button, ButtonGroup,Flex } from "@chakra-ui/react";
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
    <Flex direction={'column'} align={'center'} gap={4} minH={'100vh'}>
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
    </Flex>
  );
};

export default Products;
