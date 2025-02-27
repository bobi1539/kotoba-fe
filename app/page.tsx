"use client";

import { useEffect, useState } from "react";
import { shuffleFisherYates } from "./util/helper";
import { KotobaKanji } from "./dto/kotoba-kanji";
import { kotobaKanjiList } from "./data/data";

export default function Home() {
    const [question, setQuestion] = useState<KotobaKanji>();
    const [answers, setAnswers] = useState<KotobaKanji[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<KotobaKanji>();

    useEffect(() => {
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

    const getUniqueRandomNumbers = (min: number, max: number, count: number, excludeIndex?: number): number[] => {
        const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);

        // Remove the number selected as the question from the list of numbers that can be taken
        if (excludeIndex) {
            numbers.splice(excludeIndex, 1);
        }

        // Shuffle using Fisher-Yates
        shuffleFisherYates(numbers);

        // ${selectedAnswer?.id === answer.id ? (answer.id === question?.id ? "border-green-500" : "border-red-500") : "border-gray-800"}

        // Get a `count` number of unique numbers
        return numbers.slice(0, count);
    };

    return (
        <section className="border border-red-500 bg-gray-100 w-full h-screen grid grid-cols-2 gap-20 pt-52">
            <div className="border border-gray-800 w-[450px] h-[450px] bg-white flex justify-center items-center justify-self-end">
                <p className="text-[100px]">{question?.kanji}</p>
            </div>
            <div className="w-[450px] h-[450px] grid grid-cols-3 gap-3">
                {answers.map((answer) => {
                    let classAnswerParent = "border-gray-800";
                    let classAnswerChilds = "border-gray-800";
                    if (answer.id === selectedAnswer?.id) {
                        if (answer.id === question?.id) {
                            classAnswerParent = "border-green-500";
                            classAnswerChilds = "border-4 border-green-500";
                        } else {
                            classAnswerParent = "border-red-500";
                            classAnswerChilds = "border-4 border-red-500";
                        }
                    }
                    return (
                        <div key={answer.id} onClick={() => setSelectedAnswer(answer)} className={`${classAnswerParent} relative border bg-white flex justify-center items-center p-3 hover:cursor-pointer`}>
                            <div className={`${classAnswerChilds} absolute w-full h-full`} />
                            <div>
                                <p className="text-center font-light text-gray-900 capitalize">{answer.meaning}</p>
                                <p className="text-center font-light text-gray-700 text-sm">{answer.hiragana}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
