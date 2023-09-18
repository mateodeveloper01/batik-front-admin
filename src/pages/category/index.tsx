import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { Button, ButtonGroup } from "@chakra-ui/react";
import ItemCategory from "~/components/Items/ItemCategory";
import { CategoriesFromDB } from "~/schemas/categorySchema";
import { getItem } from "~/api/api";

const Category = () => {
  const { data: category, isLoading } = useQuery<CategoriesFromDB[]>({
    queryKey: ["category"],
    queryFn: ()=>getItem('/categories'),
  });
  return (
    <div className="flex flex-col items-center gap-4">
      {category ? (
        category.map((i: CategoriesFromDB) => <ItemCategory key={i._id} item={i} />)
      ) : (
        <>error</>
      )}
      <ButtonGroup>
        <Link href={"/category/add"}>
          <Button colorScheme={"green"}>Agregar categorias</Button>
        </Link>

        <Link href={"/"}>
          <Button colorScheme={"gray"}>Volver </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default Category;
