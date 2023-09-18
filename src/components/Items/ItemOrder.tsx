import { Box, Card, Flex, Heading, Text } from "@chakra-ui/react";
import { orderProp } from "~/schemas/orderSchema";
interface Prop {
  order: orderProp;
}
const ItemOrder = ({ order }: any) => {
  const { city_name,state_name,street_name,street_number,zip_code } = order.body.additional_info.shipments.receiver_address;
  const { first_name,last_name}= order.body.additional_info.payer

  console.log(order.body.additional_info);
  // const total = () => {
  //   let total = 0;
  //   products.forEach((item: any) => (total += item.quantity * item.price));
  //   return total;
  // };

  return (
    <Card p={4} mt={10}>
      <Heading size={'lg'}>info del pedido</Heading>
      <Box >
        <Heading size={'md'}> direccion de envio</Heading>
        <Text>Provincia:{state_name}</Text>
        <Text>Ciudad: {city_name}</Text>
        <Text>Calle: {street_name}</Text>
        <Text>Numero: {street_number}</Text>
        <Text>codigo postal: {zip_code}</Text>
      </Box>
      <Box >
        <Heading size={'md'}> Datos de facturacion</Heading>
        <Text>Nombre completo: {first_name}  {last_name}</Text>
        <Text>email</Text>
      </Box>
    </Card>
  );
};

export default ItemOrder;
