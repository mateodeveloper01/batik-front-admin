import { Button, Card } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { deleteItem } from "~/api/api";
import { env } from "~/env.mjs";
import { ProductFromDB } from "~/schemas/productSchema";

interface Prop {
  item: ProductFromDB;
}

const ItemProduct = ({ item }: Prop) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const edit = (id: string) => {
    router.push(`/products/${id}`);
  };
  return (
    <Card
      onClick={() => edit(item._id)}
      flexDirection={'row'}
      className="cursor-pointer items-center gap-4 rounded bg-slate-300 p-2 hover:bg-slate-400"
    >
      <p className="capitalize">{item.title}</p>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          deleteItem(item._id,'/products');
          queryClient.invalidateQueries()
        }}
      >
        Eliminar
      </Button>
    </Card>
  );
};

export default ItemProduct;
