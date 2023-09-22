import { Box, Card, Heading, Text } from "@chakra-ui/react";
import { PropOrder } from "schemas/orderSchema";
interface Prop {
  order: PropOrder;
}

const ItemOrder = ({ order }: Prop) => {
  const { payer, paymentStatus, products, shipments } = order;
  return (
    <Card p={4} mt={10}>
      <Heading size={"lg"}>info del pedido</Heading>
      <Box>
        <Heading size={"md"}> direccion de envio</Heading>
        <Text>Provincia:{shipments.state_name}</Text>
        <Text>Ciudad: {shipments.city_name}</Text>
        <Text>Calle: {shipments.street_name}</Text>
        <Text>Numero: {shipments.street_number}</Text>
        <Text>codigo postal: {shipments.zip_code}</Text>
      </Box>
      <Box>
        <Heading size={"md"}> Datos de facturacion</Heading>
        <Text>
          Nombre completo: {payer.first_name} {payer.last_name}
        </Text>
        <Text>email: {payer.email}</Text>
        <Text>Estado del pago : {paymentStatus}</Text>
      </Box>
    </Card>
  );
};

export default ItemOrder;
