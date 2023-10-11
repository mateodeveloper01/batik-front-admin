import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import LinkStyle from "./LinkStyle";
//   import { getItem } from "~/api/api";
//   import { PropsCategories } from "~/schemas/schemasProducts";

const NavBarButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        aria-label="Options"
        icon={<RxHamburgerMenu />}
        variant="outline"
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        size={"xs"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody
            display={"flex"}
            flexDirection={"column"}
            gap={5}
            fontWeight={"600"}
            textColor={"gray.500"}
            bg="gray.200"
            h={"full"}
            pt={10}
          >
            <LinkStyle dir="/products">productos</LinkStyle>
            <LinkStyle dir="/category">categoria</LinkStyle>
            <LinkStyle dir="/images">Imagenes</LinkStyle>
            <LinkStyle dir="/orders">Pedidos</LinkStyle>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBarButton;
