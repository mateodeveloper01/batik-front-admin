import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
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
import ItemCategory from "components/Items/ItemCategory";
import { CategoriesFromDB } from "schemas/categorySchema";
import { getItem } from "api/api";
import AddCategoryModal from "components/modal/category/AddCategoryModal";

const Category = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: category, isLoading } = useQuery<CategoriesFromDB[]>({
    queryKey: ["category"],
    queryFn: () => getItem("/categories"),
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <AddCategoryModal />
      </Modal>
      <Box h={"100vh"}>
        <Flex pl={10} align={"center"} h={"20%"}>
          <Button onClick={onOpen} colorScheme={"teal"}>
            Agregar categoria
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Titulo</Th>
                <Th>Descripcion</Th>
                <Th>Imagenes</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {category ? (
                category.map((i: CategoriesFromDB) => (
                  <ItemCategory key={i._id} item={i} />
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

export default Category;
