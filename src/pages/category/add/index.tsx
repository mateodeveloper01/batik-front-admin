import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Heading,
} from "@chakra-ui/react";
import Link from "next/link";
import { addItem } from "~/api/api";
import MyForm from "~/components/ui/forms/MyForm";
import MyInput from "~/components/ui/inputs/MyInput";
import MySelectImg from "~/components/ui/selects/MySelectImg";
import { Category, categorySchema } from "~/schemas/categorySchema";

const CategoryForm = () => {
  const onSubmit = async (data:Category) => {
    const res = await addItem(data,'/categories');
    console.log(res);
  };
  const onError = (error: any) => console.log({ error });

  return (
    <Container className="pt-2">
      <Card padding={4}>
        <Heading className="text-center text-2xl">Agregar categoria</Heading>
        <MyForm zodSchema={categorySchema} onSubmit={onSubmit} onError={onError}>
          <MyInput fieldName="title" label="Titulo" />
          <MyInput fieldName="description" label="Descripcion" />
          <MySelectImg fieldName="img"/>
          <ButtonGroup>
            <Button type="submit" colorScheme="purple">
              Agregar categoria
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
};

export default CategoryForm;
