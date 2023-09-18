import { Button, ButtonGroup, Container, VStack, Box } from "@chakra-ui/react";
import Link from "next/link";

const Nav = () => {
  return (
    <Box
      w="250px"
      // h=""
      bg="gray.200"
      // position="fixed"

      top="0"
      left="0"
      p="4"
    >
      <ButtonGroup flexDirection={"column"} gap={10}>
        <Link href={"/products"}>
          <Button color={"green"}>Productos</Button>
        </Link>
        <Link href={"/category"}>
          <Button color={"green"}>Categoria</Button>
        </Link>
        <Link href={"/sub_category"}>
          <Button color={"green"}>Sub categorias</Button>
        </Link>
        <Link href={"/images"}>
          <Button color={"green"}>Imagenes</Button>
        </Link>
        <Link href={"/orders"}>
          <Button color={"green"}>Pedidos</Button>
        </Link>
      </ButtonGroup>
    </Box>
  );
};

export default Nav;
