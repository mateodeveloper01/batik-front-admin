import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getItem } from "api/api";
import { PropOrder } from "schemas/orderSchema";
import ItemOrder from "components/Items/ItemOrder";

const OrdersContainer = () => {
  const { data: orders, isLoading } = useQuery<PropOrder[]>({
    queryKey: ["order"],
    queryFn: () => getItem("/orders"),
  });
  // console.log(orders);
  return (
    <Container>
      {orders ? (
        orders.length === 0 ? <Text>No hay pedidos</Text>:
        orders.map((order:PropOrder) => <ItemOrder key={order._id} order={order} />)
      ) : (
        <></>
      )}
    </Container>
  );
};

export default OrdersContainer;
