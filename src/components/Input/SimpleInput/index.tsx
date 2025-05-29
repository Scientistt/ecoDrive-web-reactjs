import { memo } from "react";
// import { FormEvent, memo } from "react";
import { Input, type InputProps } from "@chakra-ui/react";
// import { LuUpload } from "react-icons/lu";
// import { AWSStorageClass, NewFileDrawerProps } from "types";
// import { Drawer, SimpleButton, SimpleCancelButton, toaster, AWSStorageClassSelect } from "components";

const SimpleInput = (props: InputProps) => {
    return (
        <>
            <Input {...props} />
        </>
    );
};

export default memo(SimpleInput);
