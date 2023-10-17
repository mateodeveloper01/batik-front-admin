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
  const deleteButton = (e: any) => {
    e.stopPropagation();
    deleteItem(item._id, "/products").then(() =>
      queryClient.invalidateQueries().catch(console.error)
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditProductModal id={item._id} />
      </Modal>
      <Tr>
        <Td maxW={{ md: "200px", base: "100px" }} whiteSpace="normal">
          {item.title}
        </Td>
        <Td display={{ md: "table-cell", base: "none" }} whiteSpace="normal">
          {item.description}
        </Td>
        <Td display={{ md: "table-cell", base: "none" }} whiteSpace="normal">
          {item.categories[0].title}
        </Td>
        <Td display={{ md: "table-cell", base: "none" }}>${item.price}</Td>
        <Td display={{ md: "table-cell", base: "none" }}>{item.type}</Td>
        <Td minW={{ md: "100px" }}>
          <Image src={item.img[0].url} boxSize={"80px"} />
        </Td>
        <Td>
          <Button onClick={onOpen} colorScheme="teal">
            Editar
          </Button>
        </Td>
        <Td>
          <Button onClick={deleteButton} colorScheme="red">
            Eliminar
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default ItemProduct;
