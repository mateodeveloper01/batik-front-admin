import Nav from "./Nav";
import { Box } from "@chakra-ui/react";
const Layout = ({ children }: any) => {
  return (
    <Box css={"display:flex"}>
      <Nav />
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
