import { kotobaKanjiList } from "../data/data";

export interface AnswerStatus {
    correct: number;
    incorrect: number;
    remaining: number;
    completionPercentage: number;
}

export const startingAnswerStatus = (): AnswerStatus => {
    return {
        correct: 0,
        incorrect: 0,
        remaining: kotobaKanjiList.length,
        completionPercentage: 0,
    };
};
