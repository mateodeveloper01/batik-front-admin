import {
  Tr,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Heading,
  Stack,
  Table,
  Thead,
  Th,
  Tbody,
  Image,
} from "@chakra-ui/react";
import { PropOrder } from "schemas/orderSchema";
interface Prop {
  order: PropOrder;
}

const ItemOrder = ({ order }: Prop) => {
  const { payer, payment, shipments, date, products } = order;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tr
        _hover={{
          backgroundColor: "gray.300",
          cursor: "pointer",
        }}
        onClick={() => onOpen()}
      >
        <Td>
          {new Date(date).toLocaleString("es-AR", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Td>
        <Td>
          {payer.first_name} {payer.last_name}
        </Td>
        <Td>{payment.paymentStatus}</Td>
        <Td>
          {payment.paymentMethod == "paymentStore" && "Tienda"}
          {payment.paymentMethod == "transfer" && "Transferencia"}
          {payment.paymentMethod == "mp" && "MP"}
        </Td>
        {shipments.shippingMethod === "envio" && <Td>{shipments.status}</Td>}
      </Tr>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={4}>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
            <Stack>
              <Heading size={"md"}>Datos de comprador</Heading>
              <Text>
                Nombre: {payer.first_name} {payer.last_name}
              </Text>
              <Text>Email: {payer.email} </Text>
            </Stack>
            {shipments.shippingMethod === "envio" && (
              <Stack>
                <Heading size={"md"}>Datos de envio</Heading>
                <Text>Provincia: {shipments.state_name}</Text>
                <Text>Ciudad: {shipments.city_name}</Text>
                <Text>
                  Calle: {shipments.street_name} num
                  {shipments.street_number}
                </Text>
                <Text>Cod.postal: {shipments.zip_code}</Text>
                <Text>Estado: {shipments.status}</Text>
              </Stack>
            )}
            <Stack>
              <Heading size={"md"}>Productos</Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>imagen</Th>
                    <Th>Nombre</Th>
                    <Th>cantidad</Th>
                    <Th>precio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((item) => (
                    <Tr>
                      <Td>
                        <Image src={item.picture_url} />
                      </Td>
                      <Td>{item.title}</Td>
                      <Td>{item.quantity}</Td>
                      <Td>{item.unit_price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Stack>
            <Stack>
              <Heading size={"md"}>Estado</Heading>
              <Text>
                Metodo de pago:{" "}
                {payment.paymentMethod == "paymentStore" && "Tienda"}
                {payment.paymentMethod == "transfer" && "Transferencia"}
                {payment.paymentMethod == "mp" && "Mercado pago"}
              </Text>
              <Text>Estado del pago: {payment.paymentStatus}</Text>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemOrder;
