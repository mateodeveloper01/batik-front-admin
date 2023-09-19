import { Button, Card, Container, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getLogin } from "api/loginApi";

import { setUser } from "redux/authReducer";
import { LoginSchema } from "schemas/authSchema";
import MyInput from "components/ui/inputs/MyInput";
import MyForm from "components/ui/forms/MyForm";
interface Props {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useDispatch();
  const onSubmit = async (data: Props) => {
    const res = await getLogin(data);
    dispatch(setUser(res));
  };
  const onError = (error:any) => console.log({ error });

  return (
    <Container className="pt-2">
      <Card padding={4}>
        <Heading className="text-center text-2xl">Iniciar session</Heading>
        <MyForm
          defaultValues={{
            email: "mateopedehonta@gmail.com",
            password: "mateo123",
          }}
          zodSchema={LoginSchema}
          onSubmit={onSubmit}
          onError={onError}
        >
          <MyInput fieldName="email" label="Email" />
          <MyInput fieldName="password" label="Password" />
          <Button type="submit" colorScheme="purple">
            Iniciar sesión
          </Button>
        </MyForm>
      </Card>
    </Container>
  );
};

export default Login;
