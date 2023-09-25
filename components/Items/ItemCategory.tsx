import {
  Button,
  Tr,
  Td,
  Modal,
  ModalOverlay,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";

import { CategoriesFromDB } from "schemas/categorySchema";
import EditCategoryModal from "components/modal/category/EditCategoryModal";
import { deleteItem } from "api/api";

interface Prop {
  item: CategoriesFromDB;
}

const ItemCategory = ({ item }: Prop) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditCategoryModal id={item._id} />
      </Modal>
      <Tr>
        <Td>{item.title}</Td>
        <Td>{item.description}</Td>
        <Td>
          <Image src={item?.img[0] ? item?.img[0].url : ""} boxSize={"80px"} />
        </Td>
        <Td>
          <Button onClick={onOpen} colorScheme="teal">
            Editar
          </Button>
        </Td>
        <Td>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              deleteItem(item._id, "/categories").catch(console.error);
              queryClient.invalidateQueries().catch(console.error);
            }}
            colorScheme="red"
          >
            Eliminar
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default ItemCategory;
