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
        <Td maxW={'100px'}>{item.title}</Td>
        <Td maxW={'100px'}>{item.description}</Td>
        <Td maxW={'100px'}>{item.categories[0].title}</Td>
        <Td maxW={'100px'}>${item.price}</Td>
        <Td maxW={'100px'}>{item.type}</Td>
        <Td maxW={'100px'}>
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
              queryClient.invalidateQueries()
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
