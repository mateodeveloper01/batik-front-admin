import { Checkbox, FormControl } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export interface MyCheckbox {
  label: string;
  fieldName: string;
}

const MyCheckbox = ({ label, fieldName }: MyCheckbox) => {
  const { register } = useFormContext();

  return (
    <FormControl padding={2}>
      <Checkbox {...register(fieldName)}>{label}</Checkbox>
    </FormControl>
  );
};

export default MyCheckbox;
