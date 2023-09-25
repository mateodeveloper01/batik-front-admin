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
import { useState } from "react";

const EditCategoryModal = ({ id }: { id: string }) => {
  const [alert, setAlert] = useState<"success" | "error" | null>(null);
  const queryClient = useQueryClient();

  const { data: categories, isLoading: isLoadingCategory } = useQuery<
    CategoriesFromDB[]
  >({
    queryKey: ["categories"],
    queryFn: () => getItem("/categories"),
  });

  const item = categories?.filter((i) => i._id === id)[0];
  const onSubmit = async (data: Category) => {
    try {
      await editItem({ ...data, _id: item?._id }, "/categories");
      setAlert("success");
    } catch (error) {
      setAlert("error");
    }
  };
  const onError = (error: any) => {
    setAlert("error");
    console.log(error);
  };

  if (item) {
    return (
      <ModalContent>
        <ModalHeader>Editar categoria</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
            <MySelectImg fieldName={"img"} defaultImageId={item?.img} isProduct={false} />

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

export default EditCategoryModal;
