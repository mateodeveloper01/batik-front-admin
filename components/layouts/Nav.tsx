import {
  Button,
  ButtonGroup,
  Box,
  Flex,
  Text,
  ListIcon,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import LinkStyle from "./LinkStyle";
// import {} from 'next';
// import Link from "next/link";

const Nav = () => {
  const { pathname } = useRouter();
  return (
    <>
      <Box w="250px" h={"100vh"}></Box>
      <Flex
        w="250px"
        bg="gray.200"
        top="0"
        left="0"
        direction={"column"}
        gap={10}
        align={"end"}
        fontWeight={"600"}
        textColor={"gray.500"}
        pt={40}
        position={"fixed"}
        h={"100vh"}
      >
        <LinkStyle dir="/products">productos</LinkStyle>
        <LinkStyle dir="/category">categoria</LinkStyle>
        <LinkStyle dir="/sub_category">Sub categoria</LinkStyle>
        <LinkStyle dir="/images">Imagenes</LinkStyle>
        <LinkStyle dir="/orders">Pedidos</LinkStyle>
      </Flex>
    </>
  );
};

export default Nav;
