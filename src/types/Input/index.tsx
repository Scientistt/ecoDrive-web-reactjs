import { type FieldRootProps } from "@chakra-ui/react";
import { ReactNode, type HTMLInputTypeAttribute } from "react";

export interface FormInputProps extends FieldRootProps {
    type?: HTMLInputTypeAttribute | undefined;
    placeholder?: string;
    errorMessage?: string;
    label?: string;
    validation?: object;
    disableAutocomplete?: boolean;
    endElement?: ReactNode;
}
