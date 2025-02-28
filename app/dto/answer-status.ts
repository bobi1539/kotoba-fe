export interface AnswerStatus {
    correct: number;
    incorrect: number;
    remaining: number;
    correctPercentage: number;
}

export const startingAnswerStatus = (remaining: number): AnswerStatus => {
    return {
        correct: 0,
        incorrect: 0,
        remaining: remaining,
        correctPercentage: 0,
    };
};
