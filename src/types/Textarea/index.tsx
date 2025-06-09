import { type FieldRootProps } from "@chakra-ui/react";

export interface FormTextareaProps extends FieldRootProps {
    rows?: number;
    placeholder?: string;
    errorMessage?: string;
    label?: string;
    validation?: object;
}
