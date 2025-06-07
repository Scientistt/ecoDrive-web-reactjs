import { memo } from "react";
// import { FormEvent, memo } from "react";
import { Field, Textarea } from "@chakra-ui/react";
// import { LuUpload } from "react-icons/lu";
import { FormTextareaProps } from "types";
// import { Drawer, SimpleButton, SimpleCancelButton, toaster, AWSStorageClassSelect } from "components";

const SimpleInput = (props: FormTextareaProps) => {
    const placeholder = props.placeholder || null;
    const label = props.label || null;
    const validation = props.validation || null;
    const errorMessage = props.errorMessage || null;
    const rows = props.rows || 5;

    return (
        <>
            <Field.Root {...props}>
                <Field.Label>
                    {label}
                    <Field.RequiredIndicator />
                </Field.Label>
                <Textarea
                    rows={rows}
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
