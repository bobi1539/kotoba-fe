import { getKotobaList } from "../data/data";

export interface AnswerStatus {
    correct: number;
    incorrect: number;
    remaining: number;
    correctPercentage: number;
}

export const startingAnswerStatus = (): AnswerStatus => {
    return {
        correct: 0,
        incorrect: 0,
        remaining: getKotobaList().length,
        correctPercentage: 0,
    };
};
