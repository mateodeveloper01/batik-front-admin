import { Button, Card } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { deleteItem } from "api/api";
import { SubCategoriesFromDB } from "schemas/subCategorySchema";

interface Prop {
  item: SubCategoriesFromDB;
}

const ItemSubCategory = ({ item }: Prop) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const edit = (id: string) => {
    router.push(`/sub_category/${id}`).catch(console.error);
  };
  return (
    <Card
      onClick={() => edit(item._id)}
      flexDirection={"row"}
      className="cursor-pointer items-center gap-4 rounded bg-slate-300 p-2 hover:bg-slate-400"
    >
      <p className="capitalize">{item.title}</p>
      <Button
        onClick={(event) => {
          event.stopPropagation();
          deleteItem(item._id, "/sub-categories").catch(console.error);
          queryClient.invalidateQueries().catch(console.error);
        }}
      >
        Eliminar
      </Button>
    </Card>
  );
};

export default ItemSubCategory;
