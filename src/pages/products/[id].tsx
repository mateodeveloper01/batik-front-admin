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

import MyCheckbox from "~/components/ui/checkbox/MyCheckbox";
import MyForm from "~/components/ui/forms/MyForm";
import MyInput from "~/components/ui/inputs/MyInput";
import MySelect from "~/components/ui/selects/MySelect";
import MySelectImg from "~/components/ui/selects/MySelectImg";
import MySelectObject from "~/components/ui/selects/MySelectObject";
import { CategoriesFromDB } from "~/schemas/categorySchema";
import {
  PROD_TYPES,
  ProductFromDB,
  Products,
  productSchema,
} from "~/schemas/productSchema";
import { SubCategoriesFromDB } from "~/schemas/subCategorySchema";

const ProductEdit = () => {
  const { query } = useRouter();
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn:()=> getItem('/categories'),
  });

  const { data: subCategories, isLoading: isLoadingSubCategory } = useQuery<
    SubCategoriesFromDB[]
  >({
    queryKey: ["subCategories"],
    queryFn: ()=> getItem('/sub-categories'),
  });
  const { data: products, isLoading: isLoadingProducts } = useQuery<
    ProductFromDB[]
  >({
    queryKey: ["products"],
    queryFn: ()=> getItem('/products'),
  });
  const item = products?.filter((i) => i._id === query.id)[0];
  const onSubmit = async (data: Products) => {
    const res = await editItem({ ...data, _id: item?._id },'/products');
    console.log(res);
  };
  const onError = (error: any) => console.log({ error });
  if (!isLoadingCategory && !isLoadingSubCategory && item) {
    return (
      <Container className="pt-2">
        <Card padding={4}>
          <Heading className="text-center text-2xl">Editar productos</Heading>
          <MyForm
            zodSchema={productSchema}
            onSubmit={onSubmit}
            onError={onError}
            defaultValues={{
              ...item,
              img: item?.img[0]?._id,
              img2: item?.img[0]?._id,
              categories: item.categories ? "" : item.categories[0].title,
              sub_categories: item.sub_categories
                ? ""
                : item.sub_categories[0].title,
            }}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MyInput fieldName="description" label="Descripcion" />
            <MyInput fieldName="price" label="Precio" type="number" />
            <MyCheckbox fieldName="new" label={"Es nuevo?"} />
            <MySelectImg fieldName={"img"} defaultImageId={item?.img[0]?._id} />
            <MySelectImg
              fieldName={"img2"}
              defaultImageId={item?.img2[0]?._id}
            />
            <MySelect fieldName="type" label="Tipo" options={PROD_TYPES} />
            <MySelectObject
              fieldName="categories"
              label="categoria"
              options={categories}
              defaultValue={item?.categories[0]?._id}
            />
            <MySelectObject
              fieldName="sub_categories"
              label="sub categoria"
              options={subCategories}
              defaultValue={item?.sub_categories[0]?._id}
            />
            <ButtonGroup>
              <Button type="submit" colorScheme="purple">
                Editar producto
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

export default ProductEdit;
