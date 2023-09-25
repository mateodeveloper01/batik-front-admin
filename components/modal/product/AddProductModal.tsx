import { useState } from "react";
import {
  Button,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import MyForm from "components/ui/forms/MyForm";
import MyInput from "components/ui/inputs/MyInput";
import { addItem, getItem } from "api/api";
import MyCheckbox from "components/ui/checkbox/MyCheckbox";
import MySelectImg from "components/ui/selects/MySelectImg";
import MySelect from "components/ui/selects/MySelect";
import MySelectObject from "components/ui/selects/MySelectObject";
import { PROD_TYPES, productSchema } from "schemas/productSchema";
import { CategoriesFromDB } from "schemas/categorySchema";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AddProductModal = () => {
  const [alert, setAlert] = useState<"success" | "error" | null>(null);

  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    try {
      await addItem(data, "/products");
      setAlert("success");
    } catch (error) {
      setAlert("error");
    }
  };
  const onError = (error: any) => console.log({ error });
  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });
  if (!isLoadingCategory) {
    return (
      <ModalContent className="pt-2">
        <ModalCloseButton />
        <ModalHeader> Agregar productos</ModalHeader>
        <ModalBody>
          <MyForm
            zodSchema={productSchema}
            onSubmit={onSubmit}
            onError={onError}
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
            />
            <MySelectImg fieldName={"img"} />
            {alert ? (
                <Alert status={alert} mt={4}>
                  <AlertIcon />
                  {alert === "error" && (
                    <AlertTitle>Datos ingresados incorrecto</AlertTitle>
                  )}
                  {alert === "success" && (
                    <AlertTitle>Producto agregado</AlertTitle>
                  )}
                </Alert>
              ) : (
                <></>
              )}
            <ModalFooter>
              <Button
                onClick={() =>
                  queryClient.invalidateQueries().catch(console.error)
                }
                type="submit"
                colorScheme="purple"
              >
                Guardar
              </Button>
            </ModalFooter>
          </MyForm>
        </ModalBody>
      </ModalContent>
    );
  }
};

export default AddProductModal;
