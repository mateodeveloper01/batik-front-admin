export interface MyInputProps<T> {
  fieldName: keyof T
  label: string
  valueAsNumber?: boolean
  valueAsDate?: boolean
  showLabel?: boolean
  type?: string
  flex?: number
  placeholder?: string
  mb?: number
  size?: Sizes
  searchFn?: ((state: any) => void) | boolean
  defaultValue?: string
}

export type Sizes = "xs" | "sm" | "md" | "lg"