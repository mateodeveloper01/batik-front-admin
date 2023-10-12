import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface Props<T> {
  fieldName: keyof T;
  label: string;
  flex?: number;
  options: readonly string[];
}
function MySelect<T>({ label, fieldName, flex = 3, options }: Props<T>) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <FormControl flex={flex} paddingBottom={2} isInvalid={!!errors[fieldName as string]}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder="Seleccionar" {...register(fieldName as string)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
}

export default MySelect;
