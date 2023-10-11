import Nav from "./Nav";
import { Box, Flex } from "@chakra-ui/react";
const Layout = ({ children }: any) => {
  return (
    <Box
      w={"100vw"}
      display={"flex"}
      flexDirection={{ md: "row", base: "column" }}
      p={2}
    >
      <Flex justify={"end"}>
        <Nav />
      </Flex>
      <Box w={{ md: "80%", base: "100%" }}>{children}F</Box>
    </Box>
  );
};

export default Layout;
