import React from "react";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";

const LinkStyle = ({ dir, children }: { dir: string; children: any }) => {
  const { pathname } = useRouter();

  return (
    <Link
      href={dir}
      w={pathname == dir ? "80%" : "70%"}
      textTransform={"capitalize"}
      backgroundColor={pathname == dir && "white"}
      p={pathname == dir && "2"}
      borderRadius={pathname == dir && 4}
      mr={pathname == dir && 1}
      boxShadow={pathname == dir && "base"}
    >
      {children}
    </Link>
  );
};

export default LinkStyle;
