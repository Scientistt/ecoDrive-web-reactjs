import { memo } from "react";
// import { FormEvent, memo } from "react";
import { Input, Field } from "@chakra-ui/react";
// import { LuUpload } from "react-icons/lu";
import { FormInputProps } from "types";
// import { Drawer, SimpleButton, SimpleCancelButton, toaster, AWSStorageClassSelect } from "components";

const SimpleInput = (props: FormInputProps) => {
    const placeholder = props.placeholder || null;
    const label = props.label || null;
    const validation = props.validation || null;
    const type = props.type;
    const errorMessage = props.errorMessage || null;

    return (
        <>
            <Field.Root {...props}>
                <Field.Label>
                    {label}
                    <Field.RequiredIndicator />
                </Field.Label>
                <Input
                    type={type}
                    {...validation}
                    placeholder={placeholder ?? ``}
                    variant={"flushed"}
                    fontSize={"sm"}
                    borderBottomWidth="2px"
                    colorPalette={"primary"}
                />
                <Field.ErrorText>{errorMessage}</Field.ErrorText>
            </Field.Root>
        </>
    );
};

export default memo(SimpleInput);
