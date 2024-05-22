export const dateConvertor = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return (year * 365) + (month * 30) + day;
}

export const yearFirstConvertor = (date: string) => {
    const day = Number(date.substring(8));
    const month = Number(date.substring(5,7));
    const year = Number(date.substring(0,4));
    return (year * 365) + ((month-1) * 30) + day;
}

export const dateToNumber = (date: string) => {
    const day = Number(date.substring(0,2));
    const month = Number(date.substring(3,5));
    const year = Number(date.substring(6));

    return (year * 365) + ((month-1) * 30) + day;
}