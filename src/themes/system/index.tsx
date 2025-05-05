import { createSystem, defaultConfig } from "@chakra-ui/react";

export const systemConfig = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: `'Figtree', sans-serif` },
                body: { value: `'Figtree', sans-serif` }
            }
        }
    }
});
