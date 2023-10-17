import { useQuery } from "@tanstack/react-query";

import ItemProduct from "components/Items/ItemProduct";
import {
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Flex,
  Box,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ProductFromDB } from "schemas/productSchema";
import { getItem } from "api/api";
import AddProductModal from "components/modal/product/AddProductModal";

const SubCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: products, isLoading } = useQuery<ProductFromDB[]>({
    queryKey: ["products"],
    queryFn: () => getItem("/products"),
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <AddProductModal />
      </Modal>
      <Box h={"100vh"}>
        <Flex
          pl={10}
          align={"center"}
          h={"20%"}
          display={{ base: "none", md: "flex" }}
        >
          <Button onClick={onOpen} colorScheme={"teal"}>
            Agregar productos
          </Button>
        </Flex>
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          zIndex="1000"
          display={{ md: "none" }}
        >
          <Button
            onClick={onOpen}
            rounded={"40%"}
            colorScheme="teal"
            size="md"
            fontSize={"3xl"}
          >
            +
          </Button>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Titulo</Th>
                <Th display={{ md: "table-cell", base: "none" }}>
                  Descripcion
                </Th>
                <Th display={{ md: "table-cell", base: "none" }}>Categoria</Th>
                <Th display={{ md: "table-cell", base: "none" }} isNumeric>
                  Price
                </Th>
                <Th display={{ md: "table-cell", base: "none" }}>Tipo</Th>
                <Th>Imagenes</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products ? (
                products.map((i: ProductFromDB) => (
                  <ItemProduct key={i._id} item={i} />
                ))
              ) : (
                <>error</>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SubCategory;
