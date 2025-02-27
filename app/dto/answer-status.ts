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
        remaining: 0,
        completionPercentage: 0,
    };
};
