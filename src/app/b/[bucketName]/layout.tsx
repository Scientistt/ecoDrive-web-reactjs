import type { Metadata } from "next";
import { BucketContext } from "contexts";

export const metadata: Metadata = {
    title: "My Buckets - ecoDrive"
    // description: "Armazene com consciência. Use com liberdade."
};

export default function BucketsLayout(props: Readonly<{ children: React.ReactNode }>) {
    const { children } = props;
    const bucket = { name: "meu nome é bucket" };
    return <BucketContext.Provider value={{ bucket }}>{children}</BucketContext.Provider>;
}
