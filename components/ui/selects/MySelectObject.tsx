import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CategoriesFromDB } from "schemas/categorySchema";

interface Props<T> {
  fieldName: keyof T;
  label: string;
  flex?: number;
  options: CategoriesFromDB[];
  defaultValue?: string;
}

function MySelectObject<T>({
  label,
  fieldName,
  flex = 3,
  options,
  defaultValue,
}: Props<T>) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  useEffect(() => {
    // Establecer el valor predeterminado cuando cambia defaultValue
    if (defaultValue) {
      setValue(fieldName as string, defaultValue);
    }
  }, [defaultValue, fieldName, setValue]);
  return (
    <FormControl flex={flex} paddingBottom={2} isInvalid={!!errors[fieldName as string]}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder="Seleccionar" {...register(fieldName as string)}>
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.title}
          </option>
        ))}
      </Select>
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
}

export default MySelectObject;
