import {
  Button,
  Card,
  Container,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getLogin } from "api/loginApi";
import { useState } from "react";
import { setUser } from "redux/authReducer";
import { LoginSchema } from "schemas/authSchema";
import MyInput from "components/ui/inputs/MyInput";
import MyForm from "components/ui/forms/MyForm";
import { useRouter } from "next/router";
interface Props {
  email: string;
  password: string;
}
const Login = () => {
  const [alert, setAlert] = useState<"success" | "error" | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (data: Props) => {
    try {
      const res = await getLogin(data);
      setAlert("success");
      dispatch(setUser(res));
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setAlert("error");
    }
  };
  const onError = (error: any) => {
    console.log({ error });
    setAlert("error");
  };


  return (
    <Container pt={32}>
      <Card padding={4}>
        <Heading className="text-center text-2xl">Iniciar sesión</Heading>
        <MyForm
          // defaultValues={{
          //   email: "mateopedehonta@gmail.com",
          //   password: "mateo123",
          // }}
          zodSchema={LoginSchema}
          onSubmit={onSubmit}
          onError={onError}
        >
          <MyInput fieldName="email" label="Email" placeholder="ejemplo@gmail.com"/>
          <MyInput fieldName="password" label="Contraseña" type="password" placeholder="•••••••"/>
          <Button type="submit" colorScheme="purple">
            Iniciar sesión
          </Button>
          {alert ? (
            <Alert status={alert} mt={4}>
              <AlertIcon />
              {alert === "error" && (
                <AlertTitle>Email o contraseña Incorrecto</AlertTitle>
              )}
              {alert === "success" && <AlertTitle>Usuario Correcto</AlertTitle>}
            </Alert>
          ) : (
            <></>
          )}
        </MyForm>
      </Card>
    </Container>
  );
};
Login.layout = false;
export default Login;
