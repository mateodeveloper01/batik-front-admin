import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props<T> {
  fieldName: keyof T;
  label: string;
  flex?: number;
  options: any;
  defaultValue?: string; 
}

function MySelectObject<T>({ label, fieldName, flex = 3, options,defaultValue }: Props<T>) {
  const {
    formState: { errors },
    register,
    setValue
  } = useFormContext();
  useEffect(() => {
    // Establecer el valor predeterminado cuando cambia defaultValue
    if (defaultValue) {
      setValue(fieldName as string, defaultValue);
    }
  }, [defaultValue, fieldName, setValue]);
  return (
    <FormControl flex={flex} paddingBottom={2}>
      <FormLabel>{label}</FormLabel>
      <Select placeholder="Seleccionar" {...register(fieldName as string)}>
        {options.map((o: any) => (
          <option key={o._id} value={o._id}>
            {o.title}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default MySelectObject;
