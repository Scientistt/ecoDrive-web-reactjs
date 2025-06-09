import { memo } from "react";
import { SimpleButtonProps } from "types";
import { SubtleButton } from "components";

const SimpleCancelButton = (props: SimpleButtonProps) => {
    return (
        <>
            <SubtleButton textColor="red" {...props}>
                {props.children}
            </SubtleButton>
        </>
    );
};

export default memo(SimpleCancelButton);
