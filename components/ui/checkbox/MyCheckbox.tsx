import { Checkbox, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

export interface MyCheckbox {
  label: string;
  fieldName: string;
}

const MyCheckbox = ({ label, fieldName }: MyCheckbox) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormControl padding={2}>
      <Checkbox {...register(fieldName)}>{label}</Checkbox>
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
};

export default MyCheckbox;
