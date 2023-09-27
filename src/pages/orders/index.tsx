import React from "react";
import {
  Container,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Heading,
  TableContainer,
  Flex,
  Card,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "api/api";
import { PropOrder } from "schemas/orderSchema";
import ItemOrder from "components/Items/ItemOrder";

const OrdersContainer = () => {
  const { data: orders, isLoading } = useQuery<PropOrder[]>({
    queryKey: ["order"],
    queryFn: () => getItem("/orders"),
  });
  return (
    <>
      {orders ? (
        orders.length === 0 ? (
          <Text>No hay pedidos</Text>
        ) : (
          <Flex
            direction={"column"}
            maxW={"95%"}
            minH={"100vh"}
            justify={"space-around"}
          >
            <TableContainer p={3} m={5} bg={"gray.200"}>
              <Heading p={4} size={"md"}>
                Pedidos para envio
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>fecha</Th>
                    <Th>comprador</Th>
                    <Th>Estado del pago</Th>
                    <Th>Metodo de pago</Th>
                    <Th>Estado del envio</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders
                    .filter(
                      (i: PropOrder) => i.shipments.shippingMethod == "envio"
                    )
                    .map((order: PropOrder) => (
                      <ItemOrder key={order._id} order={order} />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>

            <TableContainer p={3} m={5} bg={"gray.200"}>
              <Heading p={4} size={"md"}>
                Pedidos para retirar
              </Heading>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>fecha</Th>
                    <Th>comprador</Th>
                    <Th>Estado del pago</Th>
                    <Th>Metodo de pago</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {orders
                    .filter(
                      (i: PropOrder) => i.shipments.shippingMethod == "retiro"
                    )
                    .map((order: PropOrder) => (
                      <ItemOrder key={order._id} order={order} />
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default OrdersContainer;
