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
        remaining: 0,
        correctPercentage: 0,
    };
};
