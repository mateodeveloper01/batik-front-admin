import { Button, Card } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { env } from "~/env.mjs";
import { CategoriesFromDB } from "schemas/categorySchema";

interface Prop {
  item: CategoriesFromDB;
}

const ItemCategory = ({ item }: Prop) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const remove = (id: string) => {
    axios
      .delete(`${env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/categories/${id}`, {
        withCredentials: true,
      })
      .then(() => queryClient.invalidateQueries())
      .catch((error) => {
        console.error(error);
      });
  };
  const edit = (id: string) => {
    router.push(`/category/${id}`).catch(console.error);
  };
  return (
    <Card
      onClick={() => edit(item._id)}
      flexDirection={"row"}
      className="cursor-pointer items-center gap-4 rounded bg-slate-300 p-2 hover:bg-slate-400"
    >
      <p className="capitalize">{item.title}</p>
      <p>{item.description}</p>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          remove(item._id);
        }}
      >
        Eliminar
      </Button>
    </Card>
  );
};

export default ItemCategory;
