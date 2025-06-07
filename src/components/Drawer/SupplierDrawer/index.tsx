import { memo, useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";

import { useTranslations } from "next-intl";
import { SupplierDrawerProps } from "types";
import { Drawer, FormInput, FormTextarea, AccountSupplierSelect } from "components";

import { useForm /*Controller */ } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

    const supplier = props.supplier;

    const schema = z.object({
        name: z.string().min(1, t("emptyNameError")),
        slug: z
            .string()
            .min(1, t("emptySlugError"))
            .regex(/^[a-z0-9-]+$/, t("invalidSlugError")),
        description: z.string().optional()
        // account_supplier: z.string().min(1, "Selecione um fornecedor").optional()
    });

    type FormData = z.infer<typeof schema>;

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, touchedFields }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            slug: "",
            description: ""
            // account_supplier: ""
        }
    });

    const name = watch("name");
    const slugTouched = touchedFields.slug;

    useEffect(() => {
        console.log("Linkou? ", slugTouched);
        if (!slugTouched) {
            setValue("slug", generateSlug(name));
        }
    }, [name, slugTouched, setValue]);

    function onSubmit(data: FormData) {
        // Aqui você pode enviar para sua API, exemplo:
        console.log("Dados enviados:", data);
    }

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            title={supplier ? t("updateCredential") : t("newCredential")}
            body={
                <>
                    <Box>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <VStack gap={4} align="stretch">
                                <AccountSupplierSelect required label={t("supplier")} />

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

                                <Button colorScheme="blue" type="submit">
                                    Enviar
                                </Button>
                            </VStack>
                        </form>
                    </Box>
                </>
            }
        />
    );
};

export default memo(NewBucketDrawer);
