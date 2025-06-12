import { memo } from "react";
import * as React from "react";
// import { FormEvent, memo } from "react";
import { Input, Field, InputGroup, IconButton, useControllableState } from "@chakra-ui/react";
import type { ButtonProps, GroupProps } from "@chakra-ui/react";
// import { LuUpload } from "react-icons/lu";
import { FormInputProps } from "types";
import { LuEye, LuEyeOff } from "react-icons/lu";

export interface PasswordVisibilityProps {
    defaultVisible?: boolean;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    visibilityIcon?: { on: React.ReactNode; off: React.ReactNode };
}

export interface PasswordInputProps extends PasswordVisibilityProps, FormInputProps {
    rootProps?: GroupProps;
}

const SimpleInput = (props: PasswordInputProps) => {
    const placeholder = props.placeholder || null;
    const label = props.label || null;
    const validation = props.validation || null;
    const type = props.type;
    const errorMessage = props.errorMessage || null;
    const disableAutocomplete = !!props.disableAutocomplete;

    const {
        rootProps,
        defaultVisible,
        visible: visibleProp,
        onVisibleChange,
        visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
        ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
        value: visibleProp,
        defaultValue: defaultVisible || false,
        onChange: onVisibleChange
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
        <>
            <Field.Root {...props}>
                <Field.Label>
                    {label}
                    <Field.RequiredIndicator />
                </Field.Label>
                <InputGroup
                    endElement={
                        type === "password" ? (
                            <VisibilityTrigger
                                disabled={rest.disabled}
                                onPointerDown={(e) => {
                                    if (rest.disabled) return;
                                    if (e.button !== 0) return;
                                    e.preventDefault();
                                    setVisible(!visible);
                                }}
                            >
                                {visible ? visibilityIcon.off : visibilityIcon.on}
                            </VisibilityTrigger>
                        ) : (
                            (props.endElement ?? <></>)
                        )
                    }
                    {...rootProps}
                >
                    {type === "password" ? (
                        <Input
                            {...rest}
                            {...(disableAutocomplete ? { autoComplete: "new-password" } : {})}
                            ref={inputRef}
                            type={visible ? "text" : "password"}
                            {...validation}
                            placeholder={placeholder ?? ``}
                            variant={"flushed"}
                            fontSize={"sm"}
                            borderBottomWidth="2px"
                            colorPalette={"primary"}
                        />
                    ) : (
                        <Input
                            type={type}
                            {...validation}
                            placeholder={placeholder ?? ``}
                            variant={"flushed"}
                            fontSize={"sm"}
                            borderBottomWidth="2px"
                            colorPalette={"primary"}
                        />
                    )}
                </InputGroup>

                <Field.ErrorText>{errorMessage}</Field.ErrorText>
            </Field.Root>
        </>
    );
};

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(function VisibilityTrigger(props, ref) {
    return (
        <IconButton
            tabIndex={-1}
            ref={ref}
            me="-2"
            aspectRatio="square"
            size="sm"
            variant="plain"
            height="calc(100% - {spacing.2})"
            aria-label="Toggle password visibility"
            {...props}
        />
    );
});

export default memo(SimpleInput);
