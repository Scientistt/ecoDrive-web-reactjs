import { memo } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

import { ColorModeButton } from "components/ui/color-mode";

// import {
//   // MessagesButton,
//   ModulesButton,
//   // NotificationButton,
//   ThemeToggleButton,
//   UserButton,
//   // FeatureNotYetAvailable,
//   // CalendarButton,
// } from 'components'
// import InfoButton from 'components/navbarItems/InfoButton'
// //import MobileSidebar from './components/MobileSidebar'
// import SidebarCollapseButton from './components/SidebarCollapseButton'

// import { useDashboardManager } from '../../contexts/DashboardManager/Provider'

const Navbar = () => {
    //   const { Brand, moduleName } = useDashboardManager()
    // const moduleName = "Meu Módulo";

    return (
        <Flex h="50px" w="full" bg="light" align="center" justify="space-between" px={2}>
            <Flex gap={2} height="50px" alignItems="center" justifyContent="space-around">
                <Image h="25px" src="https://cdn-icons-png.flaticon.com/512/3779/3779288.png" alt="ecoDrive" />
                <Text w="100%" color="ligth" fontSize="2xl" fontWeight="bold" textAlign="start">
                    ecoDrive
                </Text>
            </Flex>

            <Flex align="center" gap={2}>
                <ColorModeButton />
            </Flex>
        </Flex>
    );
};

export default memo(Navbar);
