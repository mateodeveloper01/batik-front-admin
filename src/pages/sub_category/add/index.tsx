import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import MyForm from "~/components/ui/forms/MyForm";
import MyInput from "~/components/ui/inputs/MyInput";
import MySelectObject from "~/components/ui/selects/MySelectObject";
import { SubCategorySchema } from "~/schemas/subCategorySchema";
import { addItem, getItem } from "~/api/api";
import { CategoriesFromDB } from "~/schemas/categorySchema";

const SubCategoryForm = () => {
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });

  const onSubmit = async (data: any) => {
    const res = await addItem(data, "/sub-categories");
    console.log(res);
  };
  const onError = (error: any) => console.log({ error });

  if (!isLoadingCategory) {
    return (
      <Container className="pt-2">
        <Card padding={4}>
          <Heading className="text-center text-2xl">
            Agregar sub categoria
          </Heading>
          <MyForm
            zodSchema={SubCategorySchema}
            onSubmit={onSubmit}
            onError={onError}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MySelectObject
              fieldName="categories"
              label="categoria"
              options={categories}
            />
            <ButtonGroup>
              <Button type="submit" colorScheme="purple">
                Agregar producto
              </Button>
              <Link href={"/sub_category"}>
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

export default SubCategoryForm;
