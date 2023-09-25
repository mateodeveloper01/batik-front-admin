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
import { useQueryClient } from "@tanstack/react-query";
import { Category, categorySchema } from "schemas/categorySchema";
import { addItem } from "api/api";
import MyForm from "components/ui/forms/MyForm";
import MyInput from "components/ui/inputs/MyInput";
import MySelectImg from "components/ui/selects/MySelectImg";
const AddCategoryModal = () => {
  const [alert, setAlert] = useState<"success" | "error" | null>(null);

  const queryClient = useQueryClient();

  const onSubmit = async (data: Category) => {
    try {
      await addItem(data, "/categories");
      setAlert("success");
    } catch (error) {
      setAlert("error");
    }
  };
  const onError = (error: any) => {
    setAlert('error')
    console.log({ error });
  };

  return (
    <ModalContent className="pt-2">
      <ModalCloseButton />
      <ModalHeader> Agregar categoria</ModalHeader>
      <ModalBody>
        <MyForm
          zodSchema={categorySchema}
          onSubmit={onSubmit}
          onError={onError}
        >
          <MyInput fieldName="title" label="Titulo" />
          <MyInput fieldName="description" label="Descripcion" />
          <MySelectImg fieldName="img" isProduct={false} />
          {alert ? (
            <Alert status={alert} mt={4}>
              <AlertIcon />
              {alert === "error" && (
                <AlertTitle>Datos ingresados incorrecto</AlertTitle>
              )}
              {alert === "success" && (
                <AlertTitle>Categoria agregada</AlertTitle>
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
};

export default AddCategoryModal;
