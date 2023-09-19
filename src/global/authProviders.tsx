import { type ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { PropsStateUser } from "redux/authReducer";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const PROTECTED_ROUTES = ["/"];
  const user = useSelector((state: PropsStateUser) =>
    state.user ? state.user.user : null
  );

  const validateRoutes = (user: any) => {
    if (!user && PROTECTED_ROUTES.includes(router.pathname)) {
      router.push("/acount/login").catch(console.error);
    }
    if (!!user && router.pathname === "/acount/login") {
      router.push("/").catch(console.error);
    }
  };

  useEffect(() => {
    validateRoutes(user);
  });

  return <>{children}</>;
};
