import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import MyForm from "~/components/ui/forms/MyForm";
import MyInput from "~/components/ui/inputs/MyInput";
import {
  SubCategoriesFromDB,
  SubCategorySchema,
} from "~/schemas/subCategorySchema";
import { addItem, getItem } from "~/api/api";
import MyCheckbox from "~/components/ui/checkbox/MyCheckbox";
import MySelectImg from "~/components/ui/selects/MySelectImg";
import MySelect from "~/components/ui/selects/MySelect";
import MySelectObject from "~/components/ui/selects/MySelectObject";
import { PROD_TYPES, productSchema } from "~/schemas/productSchema";
import { CategoriesFromDB } from "~/schemas/categorySchema";
import { useQuery } from "@tanstack/react-query";

const CategoryForm = () => {
  const onSubmit = async (data: any) => {
    // console.log(data);
    const res = await addItem(data, "/products");
    console.log(res);
  };
  const onError = (error: any) => console.log({ error });
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });

  const { data: subCategories, isLoading: isLoadingSubCategory } = useQuery<
    SubCategoriesFromDB[]
  >({
    queryKey: ["subCategories"],
    queryFn: () => getItem("/sub-categories"),
  });

  if (!isLoadingCategory && !isLoadingSubCategory ) {
    return (
      <Container className="pt-2">
        <Card padding={4}>
          <Heading className="text-center text-2xl">Agregar productos</Heading>
          <MyForm
            zodSchema={productSchema}
            onSubmit={onSubmit}
            onError={onError}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MyInput fieldName="description" label="Descripcion" />
            <MyInput fieldName="price" label="Precio" type="number" />
            <MyCheckbox fieldName="new" label={"Es nuevo?"} />
            <MySelectImg fieldName={"img"} />
            <MySelectImg fieldName={"img2"} />
            <MySelect fieldName="type" label="Tipo" options={PROD_TYPES} />
            <MySelectObject
              fieldName="categories"
              label="categoria"
              options={categories}
            />
            <MySelectObject
              fieldName="sub_categories"
              label="sub categoria"
              options={subCategories}
            />
            <ButtonGroup>
              <Button type="submit" colorScheme="purple">
                Agregar producto
              </Button>
              <Link href={"/products"}>
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

export default CategoryForm;
