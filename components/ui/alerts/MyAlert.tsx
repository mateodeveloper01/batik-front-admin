import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
interface Prop {
  state: "success" | "error" | null;
}
const MyAlert = ({ state }: Prop) => {
    // console.log(state);
  return state ? (
    <Alert status="success" mt={4}>
      <AlertIcon />
      <AlertTitle>Usuario Correcto</AlertTitle>
    </Alert>
  ) : (
    <></>
  );
};

export default MyAlert;
