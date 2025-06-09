export function getIdAbbreviation(id: number | string | bigint): number {
    const idStr = id.toString();
    if (idStr.startsWith("1")) {
        const reduzido = idStr.replace(/^10+/, ""); // remove "1" e zeros seguintes
        return parseInt(reduzido, 10);
    }
    return parseInt(idStr, 10); // caso não comece com 1
}
