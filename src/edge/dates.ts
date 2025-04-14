export function dateReviver(_key: string, value: string): Date | string {
    return isDateString(value) ? new Date(value) : value;
}

export function isDateString(value: string) {
    const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    return dateFormat.test(value)
}
