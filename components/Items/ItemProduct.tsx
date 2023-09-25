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
import { deleteItem } from "api/api";
import { ProductFromDB } from "schemas/productSchema";
import EditProductModal from "components/modal/product/EditProductModal";

interface Prop {
  item: ProductFromDB;
}

const ItemProduct = ({ item }: Prop) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditProductModal id={item._id} />
      </Modal>
      <Tr>
        <Td>{item.title}</Td>
        <Td>{item.description}</Td>
        <Td>{item.categories[0].title}</Td>
        <Td>${item.price}</Td>
        <Td>{item.type}</Td>
        <Td>
          <Image src={item.img[0].url} boxSize={"80px"} />
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
              deleteItem(item._id, "/products").catch(console.error);
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

export default ItemProduct;
