import { Box, Flex } from "@chakra-ui/react";

import LinkStyle from "./LinkStyle";
import NavDrawner from "./NavDrawner";

const Nav = () => {
  return (
    <>
      <Box display={{ md: "flex", base: "none" }} w="20%" h={"100vh"}></Box>
      <Flex
        display={{ md: "flex", base: "none" }}
        w="20%"
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
        className="aca"
        // display={{ md: "" }}
      >
        <LinkStyle dir="/products">productos</LinkStyle>
        <LinkStyle dir="/category">categoria</LinkStyle>
        <LinkStyle dir="/images">Imagenes</LinkStyle>
        <LinkStyle dir="/orders">Pedidos</LinkStyle>
      </Flex>
      <NavDrawner />
    </>
  );
};

export default Nav;
