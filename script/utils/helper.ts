export const sleep = async (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
};

export const timeDifference = (startDate, endDate) => {
    return (endDate.getTime() - startDate.getTime()) / 1000;
};
