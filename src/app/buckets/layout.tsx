import type { Metadata } from "next";
import { Navbar } from "components";

export const metadata: Metadata = {
    title: "My Buckets - ecoDrive"
    // description: "Armazene com consciência. Use com liberdade."
};

export default function BucketsLayout(props: Readonly<{ children: React.ReactNode }>) {
    const { children } = props;
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
