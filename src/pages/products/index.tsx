import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import ItemProduct from "components/Items/ItemProduct";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ProductFromDB } from "schemas/productSchema";
import { getItem } from "api/api";

const subCategory = () => {
  const { data: products, isLoading } = useQuery<ProductFromDB[]>({
    queryKey: ["products"],
    queryFn: ()=>getItem('/products'),
  });
  return (
    <div className="flex flex-col items-center gap-4">
      {products ? (
        products.map((i: ProductFromDB) => <ItemProduct key={i._id} item={i} />)
      ) : (
        <>error</>
      )}
      <ButtonGroup>
        <Link href={"/products/add"}>
          <Button colorScheme={"green"}>Agregar productos</Button>
        </Link>

        <Link href={"/"}>
          <Button colorScheme={"gray"}>Volver </Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export default subCategory;
