const printError = (e: unknown): string => {
    if(e instanceof Error) return `${e.name}: ${e.message} => ${e.stack}`
    return String(e);
}
