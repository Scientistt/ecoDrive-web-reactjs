import { memo } from "react";
import { Heading } from "@chakra-ui/react";

import type { CustomHeadingProps } from "types";

// import { ColorModeButton } from "components/ui/color-mode";

// interface CustomHeadingProps extends HeadingProps {
//     header: string;
// }

const PageHeading = (props: CustomHeadingProps) => {
    //   const { Brand, moduleName } = useDashboardManager()
    // const moduleName = "Meu Módulo";

    return (
        <>
            <Heading fontSize="" color="light" w="100%" bg="cyan" {...props}>
                {props.header}
            </Heading>
        </>
    );
};

export default memo(PageHeading);
