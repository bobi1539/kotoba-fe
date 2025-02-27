"use client";

import { useCallback, useEffect, useState } from "react";
import { shuffleFisherYates } from "./util/helper";
import { KotobaKanji } from "./dto/kotoba-kanji";
import { kotobaKanjiList } from "./data/data";
import { SelectedAnswer } from "./dto/selected-answer";
import { AnswerStatus, startingAnswerStatus } from "./dto/answer-status";

export default function Home() {
    const [question, setQuestion] = useState<KotobaKanji>();
    const [answers, setAnswers] = useState<KotobaKanji[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | undefined>();
    const [isButtonAnswerDisabled, setIsButtonAnswerDisabled] = useState<boolean>(false);
    const [isButtonNextDisabled, setIsButtonNextDisabled] = useState<boolean>(true);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(startingAnswerStatus());

    const randomizeQuestion = useCallback((): void => {
        const range = kotobaKanjiList.length - 1;

        // Take one question at random
        const randomQuestionIndex: number = Math.floor(Math.random() * (range + 1));
        const randomQuestion: KotobaKanji = kotobaKanjiList[randomQuestionIndex];

        // Take 8 unique numbers (since 1 is already taken as a question)
        const randomNumbers = getUniqueRandomNumbers(0, range, 8, randomQuestionIndex);

        // Add `randomQuestion` to answers
        const randomAnswers: KotobaKanji[] = [randomQuestion, ...randomNumbers.map((num) => kotobaKanjiList[num])];

        // Shuffle again so that `randomQuestion` is not always at index 0
        for (let i = randomAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomAnswers[i], randomAnswers[j]] = [randomAnswers[j], randomAnswers[i]];
        }

        setQuestion(randomQuestion);
        setAnswers(randomAnswers);
    }, []);

    useEffect((): void => {
        randomizeQuestion();
    }, [randomizeQuestion]);

    const getUniqueRandomNumbers = (min: number, max: number, count: number, excludeIndex?: number): number[] => {
        const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

        // Remove the number selected as the question from the list of numbers that can be taken
        if (excludeIndex) {
            numbers.splice(excludeIndex, 1);
        }

        // Shuffle using Fisher-Yates
        shuffleFisherYates(numbers);

        // Get a `count` number of unique numbers
        return numbers.slice(0, count);
    };

    const handleClickAnswer = (answer: KotobaKanji): void => {
        if (answer.id === question?.id) {
            setCorrectAnswer(answer);
        } else {
            setIncorrectAnswer(answer);
        }
        setIsButtonAnswerDisabled(!isButtonAnswerDisabled);
        setIsButtonNextDisabled(!isButtonNextDisabled);
    };

    const setCorrectAnswer = (answer: KotobaKanji): void => {
        setSelectedAnswer({
            isCorrect: true,
            borderParent: "border-green-500",
            borderChild: "border-4 border-green-500",
            bgColor: "bg-green-500",
            icon: "fa-solid fa-check",
            answer: answer,
        });
        setAnswerStatus((prevState) => ({
            correct: prevState.correct + 1,
            incorrect: prevState.incorrect,
            remaining: prevState.remaining,
            completionPercentage: prevState.completionPercentage,
        }));
    };

    const setIncorrectAnswer = (answer: KotobaKanji): void => {
        setSelectedAnswer({
            isCorrect: false,
            borderParent: "border-red-700",
            borderChild: "border-4 border-red-700",
            bgColor: "bg-red-700",
            icon: "fa-solid fa-xmark",
            answer: answer,
        });
        setAnswerStatus((prevState) => ({
            correct: prevState.correct,
            incorrect: prevState.incorrect + 1,
            remaining: prevState.remaining,
            completionPercentage: prevState.completionPercentage,
        }));
    };

    const handleClickNext = (): void => {
        randomizeQuestion();
        setIsButtonAnswerDisabled(!isButtonAnswerDisabled);
        setIsButtonNextDisabled(!isButtonNextDisabled);
        setSelectedAnswer(undefined);
    };

    return (
        <section className="bg-gray-100 h-screen">
            <div className="flex justify-between bg-gray-200 border-gray-500 font-light">
                <div></div>
                <div className="bg-gray-300 p-2 flex justify-between gap-4 px-10">
                    <h1>Benar : {answerStatus.correct}</h1>
                    <h1>Salah : {answerStatus.incorrect}</h1>
                    <h1>Sisa : {answerStatus.remaining}</h1>
                    <h1>{answerStatus.completionPercentage}%</h1>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-20 pt-52">
                <div className={`${selectedAnswer?.borderParent} relative border w-[450px] h-[450px] bg-white flex justify-center items-center justify-self-end`}>
                    {selectedAnswer && (
                        <>
                            <div className={`${selectedAnswer.borderChild} absolute w-full h-full border-6`} />
                            <div className={`${selectedAnswer.bgColor} absolute left-0 top-0 w-9 h-9 flex justify-center items-center`}>
                                <i className={`${selectedAnswer.icon} text-2xl text-white`} />
                            </div>
                        </>
                    )}
                    <p className="text-[100px]">{question?.kanji}</p>
                </div>
                <div className="w-[450px] h-[450px] grid grid-cols-3 gap-3">
                    {answers.map((answer) => (
                        <button key={answer.id} disabled={isButtonAnswerDisabled} onClick={() => handleClickAnswer(answer)} className={`${answer.id === selectedAnswer?.answer.id && selectedAnswer?.borderParent} relative border bg-white flex justify-center items-center p-3 hover:cursor-pointer`}>
                            {selectedAnswer && (
                                <>
                                    <div className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.borderChild} absolute w-full h-full`} />
                                    <div className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.bgColor} absolute left-0 top-0 w-6 h-6 flex justify-center items-center`}>
                                        <i className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.icon} text-white`} />
                                    </div>
                                </>
                            )}
                            <div>
                                <p className="text-center font-light text-gray-900 capitalize">{answer.meaning}</p>
                                <p className="text-center font-light text-gray-700 text-sm">{answer.hiragana}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex justify-center my-10">
                <button onClick={handleClickNext} disabled={isButtonNextDisabled} className={`${isButtonNextDisabled ? "bg-gray-500" : "bg-gray-500 hover:bg-gray-600 cursor-pointer"} px-10 py-2 text-white rounded`}>
                    Next
                </button>
            </div>
        </section>
    );
}
