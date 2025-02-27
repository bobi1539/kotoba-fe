export const getUniqueRandomNumbers = (min: number, max: number, count: number, excludeIndex: number): number[] => {
    const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    // Remove the number selected as the question from the list of numbers that can be taken
    numbers.splice(excludeIndex, 1);

    // Shuffle using Fisher-Yates
    shuffleFisherYates(numbers);

    // Get a `count` number of unique numbers
    return numbers.slice(0, count);
};

export const shuffleFisherYates = <T>(array: T[]): void => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elemen
    }
};
