"use client";

import { memo } from "react";
import React from "react";
import { BreadcrumbProps } from "types";
import { Breadcrumb, Text } from "@chakra-ui/react";
import { SimpleTooltip } from "components";

function getBreadCrumbFirstItem(title: string, onClickPath: (path: string) => void) {
    return (
        <Breadcrumb.Item key={`bc-item-first`}>
            <SimpleTooltip content={`Ir para ${title}`}>
                <Breadcrumb.Link
                    key={`bc-link-first`}
                    cursor="pointer"
                    onClick={() => {
                        onClickPath("");
                    }}
                >
                    <Text fontWeight={"bold"} fontSize={"md"} color={"green.600"}>
                        {title}
                    </Text>
                </Breadcrumb.Link>
            </SimpleTooltip>
        </Breadcrumb.Item>
    );
}

function getBreadCrumbItem(
    title: string,
    path: string,
    onClickPath: (path: string) => void,
    separator: string,
    isLast: boolean,
    key: string
) {
    return (
        <Breadcrumb.Item key={`bc-item-${key}`}>
            <SimpleTooltip content="Ir para este diretório">
                <Breadcrumb.Link
                    key={`bc-link-${key}`}
                    cursor="pointer"
                    onClick={() => {
                        onClickPath(path);
                    }}
                >
                    {isLast ? (
                        <Text fontSize={"md"} color={"green.600"}>
                            {title.toString().toLowerCase()}
                        </Text>
                    ) : (
                        <Text fontSize={"md"}>{title.toString().toLowerCase()}</Text>
                    )}
                </Breadcrumb.Link>
            </SimpleTooltip>
        </Breadcrumb.Item>
    );
}

const MyBreadcrumb = (props: BreadcrumbProps) => {
    const rootName = props.rootName || "Raiz";
    const paths = (props.path || ``).split("/");
    const onCLick = props.onClickPath || (() => {});

    const separator = "/";

    return (
        <>
            <Breadcrumb.Root>
                <Breadcrumb.List key="bc-list">
                    {getBreadCrumbFirstItem(rootName, onCLick)}

                    {paths.map((segment, index) => {
                        const eachPath = paths.slice(0, index + 1).join("/") + "/";

                        return (
                            <React.Fragment key={`bc-item-${index}`}>
                                <Breadcrumb.Separator key={`bc-separator-${index}`}>{separator}</Breadcrumb.Separator>
                                {getBreadCrumbItem(
                                    segment,
                                    eachPath,
                                    onCLick,
                                    separator,
                                    index.toString() === (paths.length - 2).toString(),
                                    `${index}`
                                )}
                            </React.Fragment>
                        );
                    })}
                </Breadcrumb.List>
            </Breadcrumb.Root>
        </>
    );
};

export default memo(MyBreadcrumb);
