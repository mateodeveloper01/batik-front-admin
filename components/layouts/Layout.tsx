import Nav from "./Nav";
import { Box } from "@chakra-ui/react";
const Layout = ({ children }: any) => {
  return (
    <Box css={"display:flex"} w={"100vw"}>
      <Nav />
      <Box w={'80%'}>{children}</Box>
    </Box>
  );
};

export default Layout;
