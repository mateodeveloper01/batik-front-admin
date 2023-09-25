import {
  Button,
  ButtonGroup,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { editItem, getItem } from "api/api";
import MyCheckbox from "components/ui/checkbox/MyCheckbox";
import MyForm from "components/ui/forms/MyForm";
import MyInput from "components/ui/inputs/MyInput";
import MySelect from "components/ui/selects/MySelect";
import MySelectImg from "components/ui/selects/MySelectImg";
import MySelectObject from "components/ui/selects/MySelectObject";
import { CategoriesFromDB } from "schemas/categorySchema";
import { imagesFromDB } from "schemas/imgSchema";
import {
  PROD_TYPES,
  ProductFromDB,
  Products,
  productSchema,
} from "schemas/productSchema";

const EditProductModal = ({ id }: { id: string }) => {
  const [alert, setAlert] = useState<"success" | "error" | null>(null);

  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery<
    ProductFromDB[]
  >({
    queryKey: ["products"],
    queryFn: () => getItem("/products"),
  });
  const item = products?.filter((i) => i._id === id)[0];
  const onSubmit = async (data: Products) => {
    try {
      await editItem({ ...data, _id: item?._id }, "/products");
      setAlert("success");
    } catch (error) {
      setAlert("error");
    }
  };
  const queryClient = useQueryClient();

  const onError = (error: any) => {
    setAlert("error");
    console.log(error);
  };
  if (!isLoadingCategory && item) {
    return (
      <ModalContent>
        <ModalHeader>Editar productos</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <MyForm
            zodSchema={productSchema}
            onSubmit={onSubmit}
            onError={onError}
            defaultValues={{
              ...item,
              img: item?.img[0]?._id,
              img2: item?.img[0]?._id,
              categories: item.categories ? "" : item.categories[0].title,
            }}
          >
            <MyInput fieldName="title" label="Titulo" />
            <MyInput fieldName="description" label="Descripcion" />
            <MyInput fieldName="price" label="Precio" type="number" />
            <MyCheckbox fieldName="new" label={"Es nuevo?"} />
            <MySelect fieldName="type" label="Tipo" options={PROD_TYPES} />
            <MySelectObject
              fieldName="categories"
              label="categoria"
              options={categories}
              defaultValue={item?.categories[0]?._id}
            />
            <MySelectImg fieldName={"img"} defaultImageId={item?.img} />
            {alert ? (
              <Alert status={alert} mt={4}>
                <AlertIcon />
                {alert === "error" && (
                  <AlertTitle>Datos ingresados incorrecto</AlertTitle>
                )}
                {alert === "success" && (
                  <AlertTitle>Producto editado</AlertTitle>
                )}
              </Alert>
            ) : (
              <></>
            )}
            <ModalFooter>
              <ButtonGroup>
                <Button
                  onClick={() =>
                    queryClient.invalidateQueries().catch(console.error)
                  }
                  type="submit"
                  colorScheme="purple"
                >
                  Guardar
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </MyForm>
        </ModalBody>
      </ModalContent>
    );
  }
};

export default EditProductModal;
