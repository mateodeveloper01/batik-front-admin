import { Box, Card, Heading, Text } from "@chakra-ui/react";
interface Prop {
  order: {
    body: {
      additional_info: {
        shipments: {
          receiver_address: {
            city_name: string;
            state_name: string;
            street_name: string;
            street_number: string;
            zip_code: string;
          };
        };
        payer: { first_name: string; last_name: string };
      };
    };
  };
}
const ItemOrder = ({ order }: Prop) => {
  const { city_name, state_name, street_name, street_number, zip_code } =
    order.body.additional_info.shipments.receiver_address;
  const { first_name, last_name } = order.body.additional_info.payer;


  return (
    <Card p={4} mt={10}>
      <Heading size={"lg"}>info del pedido</Heading>
      <Box>
        <Heading size={"md"}> direccion de envio</Heading>
        <Text>Provincia:{state_name}</Text>
        <Text>Ciudad: {city_name}</Text>
        <Text>Calle: {street_name}</Text>
        <Text>Numero: {street_number}</Text>
        <Text>codigo postal: {zip_code}</Text>
      </Box>
      <Box>
        <Heading size={"md"}> Datos de facturacion</Heading>
        <Text>
          Nombre completo: {first_name} {last_name}
        </Text>
        <Text>email</Text>
      </Box>
    </Card>
  );
};

export default ItemOrder;
