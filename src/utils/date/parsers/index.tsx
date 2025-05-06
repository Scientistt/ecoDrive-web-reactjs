import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

const getUserTimeZone = (): string => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getTimeZoneAbbreviation = (date: Date, timeZone: string): string => {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "short"
    });
    const parts = formatter.formatToParts(date);
    const tz = parts.find((part) => part.type === "timeZoneName");
    return tz ? tz.value : "";
};

export const formatDateFullText = (date: Date): string => {
    if (!date) return "--";

    const dt = new Date(date);
    const abbreviation = getTimeZoneAbbreviation(dt, getUserTimeZone());

    const formattedDate = formatInTimeZone(dt, getUserTimeZone(), "dd 'de' MMMM 'de' yyyy 'às' HH'h'mm'm", {
        locale: ptBR
    });

    return `${formattedDate} (${abbreviation})`;
};

export const parseDateDMY = (date: Date): string => {
    if (!date) return "--";

    const dt = new Date(date);
    const formattedDate = formatInTimeZone(dt, getUserTimeZone(), "dd-MM-yyyy", {
        locale: ptBR
    });

    return formattedDate;
};
export const parseDateYMD = (date: Date): string => {
    if (!date) return "--";

    const dt = new Date(date);
    const formattedDate = formatInTimeZone(dt, getUserTimeZone(), "yyyy-MM-dd", {
        locale: ptBR
    });

    return formattedDate;
};
