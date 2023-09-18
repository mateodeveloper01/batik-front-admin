import { useState, type ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [validating, setValidating] = useState(true);
  const router = useRouter();
  const PROTECTED_ROUTES = ["/"];
  const user = useSelector((state: any) => state.user.user);

  const validateRoutes = (user: any) => {
    if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
      router.push("/acount/login");
    }
    if (!!user && router.pathname === "/acount/login") {
      router.push("/");
    }
    setTimeout(() => {
      setValidating(false);
    }, 50);
  };

  useEffect(() => {
    validateRoutes(user);
  });

  return <>{children}</>;
};
