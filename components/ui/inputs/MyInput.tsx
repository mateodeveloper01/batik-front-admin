import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { MyInputProps } from "schemas/UiSchemas";

function MyInput<T>({
  fieldName,
  label,
  flex = 4,
  showLabel = true,
  valueAsNumber = false,
  valueAsDate = false,
  type = "text",
  placeholder,
  mb = 5,
  size,
}: MyInputProps<T>) {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  const registerOptions = valueAsNumber ? { valueAsNumber } : { valueAsDate };
  return (
    <FormControl mb={mb} isInvalid={!!errors[fieldName as string]} flex={flex}>
      {!!showLabel && <FormLabel>{label}</FormLabel>}
      <Flex gap={2}>
        <Input
          size={size}
          type={type}
          placeholder={placeholder || label}
          {...register(fieldName as string, registerOptions)}
        />
      </Flex>
      <FormErrorMessage>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  );
}

export default MyInput;
