import Nav from "./Nav";
import { Box, Flex } from "@chakra-ui/react";
const Layout = ({ children }: any) => {
  return (
    <Box
      w={"100vw"}
      display={"flex"}
      flexDirection={{ md: "row", base: "column" }}
      minH={"100vh"}
    >
      <Flex justify={"end"} w={{ md: "20%", base: "100%" }}>
        <Nav />
      </Flex>
      <Box w={{ md: "80%", base: "100%" }}>{children}</Box>
    </Box>
  );
};

export default Layout;
