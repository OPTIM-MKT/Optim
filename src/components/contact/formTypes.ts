import type { IconType } from "react-icons";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export interface FieldWrapperProps {
  label: string;
  fieldId: string;
  required?: boolean;
  error?: string;
  icon?: IconType;
  children: React.ReactNode;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldId: string;
  required?: boolean;
  icon?: IconType;
  error?: string;
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  fieldId: string;
  required?: boolean;
  icon?: IconType;
  error?: string;
  placeholder?: string;
  options: readonly { value: string; label: string }[];
}

export interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  fieldId: string;
  required?: boolean;
  icon?: IconType;
  error?: string;
}