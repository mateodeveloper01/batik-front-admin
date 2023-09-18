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
import { editItem, getItem } from "~/api/api";
import MyForm from "~/components/ui/forms/MyForm";
import MyInput from "~/components/ui/inputs/MyInput";
import MySelectObject from "~/components/ui/selects/MySelectObject";
import { CategoriesFromDB } from "~/schemas/categorySchema";
import {
  SubCategoriesFromDB,
  SubCategorySchema,
} from "~/schemas/subCategorySchema";

const ProductEdit = () => {
  const { query } = useRouter();

  const { data: subCategories, isLoading: isLoadingSubCategory } = useQuery<
    SubCategoriesFromDB[]
  >({
    queryKey: ["subCategories"],
    queryFn: () => getItem("/sub-categories"),
  });
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });
  const item = subCategories?.filter((i) => i._id === query.id)[0];
  const onSubmit = async (data: any) => {
    const res = await editItem({ ...data, _id: item?._id }, "/sub-categories");
    console.log(res);
  };
  const onError = (error: any) => console.log({ error });
  console.log(item?.categories[0]?._id);
  if (!isLoadingSubCategory && !isLoadingCategory && item) {
    return (
      <Container className="pt-2">
        <Card padding={4}>
          <Heading className="text-center text-2xl">Editar productos</Heading>
          <MyForm
            zodSchema={SubCategorySchema}
            onSubmit={onSubmit}
            onError={onError}
            defaultValues={{ ...item }}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MySelectObject
              fieldName="categories"
              label="categoria"
              options={categories}
              defaultValue={item?.categories[0]?._id}
            />
            <ButtonGroup>
              <Button type="submit" colorScheme="purple">
                Editar categoria
              </Button>
              <Link href={"/sub_category/"}>
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

export default ProductEdit;
