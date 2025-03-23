import React from "react";
import { useField } from "formik";
import { TextField } from "@mui/material";

export interface CustomTextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  type,
  disabled,
  placeholder,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const isArrayField = [
    "skills",
    "projects",
    "experience",
    "education",
  ].includes(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | string[] = event.target.value;

    if (isArrayField) {
      value = value.split(",").map((item) => item);
    }

    setValue(value);
  };

  return (
    <TextField
      sx={{ border: "none" }}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      disabled={disabled}
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error ? meta.error : ""}
      {...field}
      onChange={handleChange}
      {...rest}
    />
  );
};
