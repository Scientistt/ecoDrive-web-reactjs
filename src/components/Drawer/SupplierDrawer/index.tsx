"use client";

import { memo, useEffect, useState } from "react";
import { Spinner, VStack } from "@chakra-ui/react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { AccountSupplier, SupplierDrawerProps } from "types";
import { Drawer, FormInput, FormTextarea, AccountSupplierSelect, SimpleButton } from "components";
import { createSupplier, validateSupplierSlug } from "endpoints";
import { getAccountSupplier } from "utils";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuCheck, LuX } from "react-icons/lu";

// const accountSupplierOptions = [
//     { value: "supplier_1", label: "Fornecedor 1" },
//     { value: "supplier_2", label: "Fornecedor 2" },
//     { value: "supplier_3", label: "Fornecedor 3" }
// ];

function generateSlug(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]+/g, "-") // só letras e hífen
        .replace(/^-+|-+$/g, "") // remove hífen no início e fim
        .replace(/--+/g, "-"); // hífen duplo vira simples
}

const NewBucketDrawer = (props: SupplierDrawerProps) => {
    const isOpen = !!props.isOpen;
    const onClose = props.onClose ? props.onClose : () => {};
    const onOpen = props.onOpen ? props.onOpen : () => {};

    const t = useTranslations("CredentialDrawer");
    const tAccountSupplier = useTranslations("AccountSupplier");

    const supplier = props.supplier;

    const [isCreationLoading, setIsCreationLoading] = useState(false);
    const [SlugValidationTimeout, setSlugValidationTimeout] = useState<NodeJS.Timeout | null>(null);
    const [isSlugCheckLoading, setIsSlugCheckLoading] = useState(false);
    const [isSlugValidated, setIsSlugValidated] = useState(false);
    const [isSlugValid, setIsSlugValid] = useState(false);

    const schema = z.object({
        name: z.string().min(1, t("emptyNameError")),
        slug: z
            .string()
            .min(1, t("emptySlugError"))
            .regex(/^[a-z0-9-]+$/, t("invalidSlugError")),
        description: z.string().optional(),
        account_secret: z.string().min(1, t("emptyAwsUserSecretError")),
        account_key: z.string().min(1, t("emptyAwsUserKeyError")),
        account_supplier: z
            .object({
                key: z.string(),
                name: z.string()
            })
            .refine((value) => value.key === "aws", {
                message: t("unsupportedSupplierError") // mensagem de erro personalizada
                // path: ["key"] // aponta o erro diretamente para o campo "key"
            })
    });

    const submitForm = async () => {
        handleSubmit(onSubmit)();
    };

    type FormData = z.infer<typeof schema>;

    const defautlValues = {
        name: "",
        slug: "",
        description: "",
        account_key: "",
        account_secret: "",
        account_supplier: supplier
            ? getAccountSupplier(supplier.account_supplier, tAccountSupplier as unknown as typeof useTranslations)
            : getAccountSupplier("aws", tAccountSupplier as unknown as typeof useTranslations)
    };

    const {
        register,
        handleSubmit,
        watch,
        control,
        setValue,
        getValues,
        clearErrors,
        reset,
        setError,
        trigger,
        formState: { errors, touchedFields }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: defautlValues
    });

    const name = watch("name");
    const slugTouched = touchedFields.slug;

    const onChangeSlug = async () => {
        setIsSlugValidated(false);

        const slug = getValues().slug;
        // const slugstate = getFieldState("slug");

        if (slug !== "" && slug !== supplier?.slug) {
            const slugState = await trigger("slug");
            console.log("X: ", slugState);
            if (slugState) {
                console.log("AQui????????????????????????????????????????");
                if (SlugValidationTimeout) clearTimeout(SlugValidationTimeout);

                const timeout = setTimeout(async () => {
                    try {
                        clearErrors("slug");
                        setIsSlugCheckLoading(true);
                        const slugState = await trigger("slug");
                        console.log("X: ", slugState);
                        if (slugState) {
                            const slugValid = await validateSupplierSlug(supplier?.id?.toString() ?? "0", slug);
                            setIsSlugValid(slugValid);
                        }
                    } catch {
                        setError("slug", {
                            type: "manual",
                            message: t("takenSlugError") // ou uma string direta
                        });
                        setIsSlugValid(false);
                    } finally {
                        setIsSlugCheckLoading(false);
                        setIsSlugValidated(true);
                    }
                }, 1000);

                setSlugValidationTimeout(timeout);
            }
        }
    };

    const onChangeSupplier = (e: AccountSupplier) => {
        clearErrors("account_supplier");
        if (e.key !== "aws")
            setError("account_supplier", {
                type: "manual",
                message: t("unsupportedSupplierError") // ou uma string direta
            });
    };

    useEffect(() => {
        if (!slugTouched) {
            setValue("slug", generateSlug(name));
            onChangeSlug();
        }
    }, [name, slugTouched, setValue]);

    async function onSubmit(data: FormData) {
        setIsCreationLoading(true);

        // Aqui você pode enviar para sua API, exemplo:

        const dt = { ...data, account_supplier: data.account_supplier.key };

        try {
            await createSupplier(dt);

            toast.success(t("creadentialCreatedSuccess"), {
                position: "bottom-right",
                closeOnClick: true,
                type: "success",
                pauseOnHover: true,
                draggable: true,
                isLoading: false,
                autoClose: 5000,
                theme: "colored"
            });
            reset(defautlValues);
            onClose();
        } catch (error) {
            console.log("error: ", error);
            toast.success(t("creadentialCreatedError"), {
                position: "bottom-right",
                closeOnClick: true,
                type: "success",
                pauseOnHover: true,
                draggable: true,
                isLoading: false,
                autoClose: 5000,
                theme: "colored"
            });
        } finally {
            setIsCreationLoading(false);
        }
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            title={supplier ? t("updateCredential") : t("newCredential")}
            subtitle={supplier ? t("updateCredentialSubtitle") : t("newCredentialSubtitle")}
            body={
                <>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <VStack gap={4} align="stretch">
                                <Controller
                                    control={control}
                                    name="account_supplier"
                                    render={({ field, fieldState }) => {
                                        // return <AccountSupplierSelect required label={t("supplier")} {...field} />;
                                        return (
                                            <AccountSupplierSelect
                                                required
                                                label={t("supplier")}
                                                value={field.value as unknown as AccountSupplier}
                                                onChangeValue={(e) => {
                                                    onChangeSupplier(e);
                                                    field.onChange(e);
                                                }}
                                                onBlurValue={field.onBlur}
                                                invalid={!!errors.account_supplier}
                                                errorMessage={fieldState.error?.message}
                                            />
                                        );
                                    }}
                                />

                                <FormInput
                                    label={t("awsUserKey")}
                                    type="password"
                                    disableAutocomplete={true}
                                    placeholder={t("awsUserKeyPlaceholder")}
                                    validation={{ ...register("account_key") }}
                                    invalid={!!errors.account_key}
                                    required
                                    errorMessage={errors.account_key && errors.account_key.message}
                                />

                                <FormInput
                                    label={t("awsUserSecret")}
                                    type="password"
                                    disableAutocomplete={true}
                                    placeholder={t("awsUserSecretPlaceholder")}
                                    validation={{ ...register("account_secret") }}
                                    invalid={!!errors.account_secret}
                                    required
                                    errorMessage={errors.account_secret && errors.account_secret.message}
                                />

                                <FormInput
                                    label={t("name")}
                                    type="text"
                                    placeholder={t("namePlaceholder")}
                                    validation={{ ...register("name") }}
                                    invalid={!!errors.name}
                                    required
                                    errorMessage={errors.name && errors.name.message}
                                />

                                <FormInput
                                    label={t("slug")}
                                    type="text"
                                    required
                                    placeholder={t("slugPlaceholder")}
                                    validation={{ ...register("slug") }}
                                    invalid={!!errors.slug}
                                    errorMessage={errors.slug && errors.slug.message}
                                    onChange={onChangeSlug}
                                    endElement={
                                        isSlugCheckLoading ? (
                                            <Spinner />
                                        ) : isSlugValidated ? (
                                            isSlugValid ? (
                                                <LuCheck color="green" size={"20px"} />
                                            ) : (
                                                <LuX color="red" size={"20px"} />
                                            )
                                        ) : (
                                            <></>
                                        )
                                    }
                                />

                                <FormTextarea
                                    label={t("description")}
                                    required
                                    placeholder={t("descriptionPlaceholder")}
                                    validation={{ ...register("description") }}
                                    rows={5}
                                    invalid={!!errors.description}
                                    errorMessage={errors.description && errors.description.message}
                                />

                                {/* Account Supplier */}
                                {/* <Field isInvalid={!!errors.account_supplier}>
                                    <Field.Label>Fornecedor</Field.Label>
                                    <Controller
                                        control={control}
                                        name="account_supplier"
                                        render={({ field }) => (
                                            <Select placeholder="Selecione fornecedor" {...field}>
                                                {accountSupplierOptions.map(({ value, label }) => (
                                                    <option key={value} value={value}>
                                                        {label}
                                                    </option>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {errors.account_supplier && errors.account_supplier.message}
                                    </FormErrorMessage>
                                </Field> */}

                                {/* <Button colorScheme="blue" type="submit">
                                    Enviar
                                </Button> */}
                            </VStack>
                        </form>
                    </Box>
                </>
            }
            footer={
                <HStack gap={"10px"}>
                    <SimpleButton
                        onClick={submitForm}
                        disabled={!isSlugValidated || isCreationLoading || isSlugCheckLoading}
                    >
                        <Text>{supplier ? t("save") : t("create")}</Text>
                    </SimpleButton>
                </HStack>
            }
        />
    );
};

export default memo(NewBucketDrawer);
