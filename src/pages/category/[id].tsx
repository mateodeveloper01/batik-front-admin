import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { editItem, getItem } from "api/api";

import {
  CategoriesFromDB,
  Category,
  categorySchema,
} from "schemas/categorySchema";
import MyInput from "components/ui/inputs/MyInput";
import MySelectImg from "components/ui/selects/MySelectImg";
import MyForm from "components/ui/forms/MyForm";

const CategoryEdit = () => {
  const { query } = useRouter();
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });

  const item = categories?.filter((i) => i._id === query.id)[0];
  const onSubmit = async (data: Category) => {
     await editItem({ ...data, _id: item?._id }, "/categories");
  };
  const onError = (error: any) => console.log({ error });

  if (item) {
    return (
      <Container className="pt-2">
        <Card padding={4}>
          <Heading className="text-center text-2xl">Editar categoria</Heading>
          <MyForm
            zodSchema={categorySchema}
            onSubmit={onSubmit}
            onError={onError}
            defaultValues={{
              ...item,
              img: item?.img[0]?._id,
            }}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MyInput fieldName="description" label="Descripcion" />
            <MySelectImg fieldName={"img"} defaultImageId={item?.img[0]?._id} />
            <ButtonGroup>
              <Button type="submit" colorScheme="purple">
                Editar categoria
              </Button>
              <Link href={"/category"}>
                <Button type="submit" colorScheme="gray">
                  Volver
                </Button>
              </Link>
            </ButtonGroup>
          </MyForm>
        </Card>
      </Container>
    );
  }
};

export default CategoryEdit;
