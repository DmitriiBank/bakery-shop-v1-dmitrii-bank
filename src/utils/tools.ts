
export const getRandomNumber = (start: number, finish: number) => {
    return Math.floor(Math.random() * (finish - start) + start);
}