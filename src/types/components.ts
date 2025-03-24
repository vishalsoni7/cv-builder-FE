import { ReactNode } from "react";

// Defines props for a custom text field component with optional attributes like type, placeholder, and multiline support.
export interface CustomTextFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
}

// Defines props for a modal component, including children, open state, and a function to handle closing.
export interface CustomModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
}

// Defines props for a store context provider, ensuring it wraps child components.
export interface StoreContextProviderProps {
  children: ReactNode;
}
