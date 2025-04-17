import { N4_01, N4_02, N5_01, N5_02, N5_03, N5_04, N5_05, N5_06 } from "../constant/general";
import { getKotobaListN4Part01 } from "../data/n4/part-01";
import { getKotobaListN4Part02 } from "../data/n4/part-02";
import { getKotobaListN5Part01 } from "../data/n5/part-01";
import { getKotobaListN5Part02 } from "../data/n5/part-02";
import { getKotobaListN5Part03 } from "../data/n5/part-03";
import { getKotobaListN5Part04 } from "../data/n5/part-04";
import { getKotobaListN5Part05 } from "../data/n5/part-05";
import { getKotobaListN5Part06 } from "../data/n5/part-06";
import { Kotoba } from "../dto/kotoba-kanji";

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

export const getSelectLevelMap = (): Map<string, Kotoba[]> => {
    return new Map([
        [N5_01, getKotobaListN5Part01()],
        [N5_02, getKotobaListN5Part02()],
        [N5_03, getKotobaListN5Part03()],
        [N5_04, getKotobaListN5Part04()],
        [N5_05, getKotobaListN5Part05()],
        [N5_06, getKotobaListN5Part06()],
        [N4_01, getKotobaListN4Part01()],
        [N4_02, getKotobaListN4Part02()],
    ]);
};
