"use client";

import { useCallback, useEffect, useState } from "react";
import { getSelectLevelMap, getUniqueRandomNumbers, shuffleFisherYates } from "./util/helper";
import { Kotoba } from "./dto/kotoba-kanji";
import { SelectedAnswer } from "./dto/selected-answer";
import { AnswerStatus, startingAnswerStatus } from "./dto/answer-status";
import SelectLevel from "./select-level";
import { N5_01 } from "./constant/general";
import Swal from "sweetalert2";

export default function Home() {
    const [currentLevel, setCurrentLevel] = useState<string>(N5_01);
    const [kotobaList, setKotobaList] = useState<Kotoba[]>([]);
    const [question, setQuestion] = useState<Kotoba | null>(null);
    const [answers, setAnswers] = useState<Kotoba[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer | undefined>();
    const [isButtonAnswerDisabled, setIsButtonAnswerDisabled] = useState<boolean>(false);
    const [isButtonNextDisabled, setIsButtonNextDisabled] = useState<boolean>(true);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(startingAnswerStatus());
    const [nextQuestion, setNextQuestion] = useState<number>(0);
    const [isModalSelectLevelOpen, setIsModalSelectLevelOpen] = useState<boolean>(false);
    const [isKanjiToMeaning, setIsKanjiToMeaning] = useState<boolean>(true);
    const [isShowHiraganaInQuestion, setIsShowHiraganaInQuestion] = useState<boolean>(false);

    useEffect((): void => {
        const dataKotobaList = getSelectLevelMap().get(currentLevel) ?? [];
        shuffleFisherYates(dataKotobaList);
        setKotobaList(dataKotobaList);

        setNextQuestion(0);
        setIsButtonAnswerDisabled(false);
        setIsButtonNextDisabled(true);
        setSelectedAnswer(undefined);
        setAnswerStatus(startingAnswerStatus());
    }, [currentLevel]);

    useEffect((): void => {
        setAnswerStatus((prevState) => ({
            correct: prevState.correct,
            incorrect: prevState.incorrect,
            remaining: kotobaList.length,
            correctPercentage: prevState.correctPercentage,
        }));
    }, [kotobaList.length]);

    useEffect((): void => {
        const totalQuestion = answerStatus.correct + answerStatus.incorrect + answerStatus.remaining;
        if (totalQuestion !== 0 && nextQuestion >= totalQuestion) {
            Swal.fire({
                title: "Selesai",
                text: `Benar ${answerStatus.correct} dari ${totalQuestion}`,
                icon: "success",
                confirmButtonColor: "#15803d",
                customClass: {
                    popup: "custom-swal",
                },
            });
        }
    });

    useEffect((): void => {
        if (nextQuestion >= kotobaList.length) {
            setNextQuestion(0);
            setAnswerStatus({
                correct: 0,
                incorrect: 0,
                remaining: kotobaList.length,
                correctPercentage: 0,
            });
            shuffleFisherYates(kotobaList);
            return;
        }

        const randomQuestion: Kotoba = kotobaList[nextQuestion];

        // Take 8 unique numbers (since 1 is already taken as a question)
        const randomNumbers = getUniqueRandomNumbers(0, kotobaList.length - 1, 8, nextQuestion);

        // Add `randomQuestion` to answers
        const randomAnswers: Kotoba[] = [randomQuestion, ...randomNumbers.map((num) => kotobaList[num])];

        // Shuffle again so that `randomQuestion` is not always at index 0
        shuffleFisherYates(randomAnswers);

        setQuestion(randomQuestion);
        setAnswers(randomAnswers);
    }, [kotobaList, nextQuestion]);

    const handleClickAnswer = (answer: Kotoba): void => {
        if (answer.id === question?.id) {
            setCorrectAnswer(answer);
        } else {
            setIncorrectAnswer(answer);
        }
        setIsButtonAnswerDisabled(!isButtonAnswerDisabled);
        setIsButtonNextDisabled(!isButtonNextDisabled);
    };

    const setCorrectAnswer = (answer: Kotoba): void => {
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
            remaining: prevState.remaining - 1,
            correctPercentage: calculateCorrectPercentage(prevState.correct + 1, prevState.incorrect),
        }));
    };

    const setIncorrectAnswer = (answer: Kotoba): void => {
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
            remaining: prevState.remaining - 1,
            correctPercentage: calculateCorrectPercentage(prevState.correct, prevState.incorrect + 1),
        }));
    };

    const calculateCorrectPercentage = (correct: number, incorrect: number): number => {
        const total = correct + incorrect;
        return Math.floor((correct / total) * 100);
    };

    const handleClickNext = useCallback((): void => {
        setNextQuestion((prev) => prev + 1);
        setIsButtonAnswerDisabled(!isButtonAnswerDisabled);
        setIsButtonNextDisabled(!isButtonNextDisabled);
        setSelectedAnswer(undefined);
    }, [isButtonAnswerDisabled, isButtonNextDisabled]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space" && isButtonAnswerDisabled) {
                handleClickNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClickNext, isButtonAnswerDisabled]);

    return (
        <section className="bg-gray-100 h-screen">
            <div className="lg:flex lg:justify-between bg-gray-200 border-gray-500 font-light">
                <div className="flex justify-between w-full">
                    <div className="lg:py-2 py-1 pl-1">
                        <button onClick={() => setIsKanjiToMeaning(!isKanjiToMeaning)} className="bg-gray-500 hover:bg-gray-400 cursor-pointer px-5 py-1 text-white rounded flex justify-center items-center gap-2">
                            {isKanjiToMeaning ? (
                                <>
                                    Arti <i className="fa-solid fa-arrow-right text-white text-sm" /> Kanji
                                </>
                            ) : (
                                <>
                                    Kanji <i className="fa-solid fa-arrow-right text-white text-sm" /> Arti
                                </>
                            )}
                        </button>
                    </div>
                    <div className="lg:py-2 py-1 pr-1">
                        <button onClick={() => setIsModalSelectLevelOpen(!isModalSelectLevelOpen)} className="bg-gray-500 hover:bg-gray-400 cursor-pointer px-5 py-1 text-white rounded">
                            Pilih Level
                        </button>
                    </div>
                </div>
                <div className="bg-gray-300 flex justify-between items-center gap-4 px-10 py-2 lg:py-0 lg:w-[450px]">
                    <h1>Benar : {answerStatus.correct}</h1>
                    <h1>Salah : {answerStatus.incorrect}</h1>
                    <h1>Sisa : {answerStatus.remaining}</h1>
                    <h1>{answerStatus.correctPercentage}%</h1>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20 pt-5 lg:pt-24">
                <div className={`${selectedAnswer?.borderParent} relative border w-[350px] h-[180px] lg:w-[450px] lg:h-[450px] bg-white flex justify-center items-center justify-self-center lg:justify-self-end`}>
                    {selectedAnswer && (
                        <>
                            <div className={`${selectedAnswer.borderChild} absolute w-full h-full border-6`} />
                            <div className={`${selectedAnswer.bgColor} absolute left-0 top-0 w-9 h-9 flex justify-center items-center`}>
                                <i className={`${selectedAnswer.icon} text-2xl text-white`} />
                            </div>
                        </>
                    )}
                    {isKanjiToMeaning ? (
                        <p className="text-[30px] lg:text-[50px] text-center">{question?.kanji}</p>
                    ) : (
                        <div className="p-2" onMouseEnter={() => setIsShowHiraganaInQuestion(true)} onMouseLeave={() => setIsShowHiraganaInQuestion(false)} onClick={() => setIsShowHiraganaInQuestion(!isShowHiraganaInQuestion)}>
                            <p className="text-[30px] lg:text-[50px] text-center capitalize leading-12">{question?.meaning}</p>
                            {isShowHiraganaInQuestion && <p className="text-sm lg:text-2xl text-center mt-2">{question?.hiragana}</p>}
                        </div>
                    )}
                </div>
                <div className="w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] grid grid-cols-3 gap-2 lg:gap-3 justify-self-center lg:justify-self-start">
                    {answers.map((answer) => (
                        <button key={answer.id} disabled={isButtonAnswerDisabled} onClick={() => handleClickAnswer(answer)} className={`${answer.id === selectedAnswer?.answer.id && selectedAnswer?.borderParent} relative border bg-white flex justify-center items-center hover:cursor-pointer`}>
                            {selectedAnswer && (
                                <>
                                    <div className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.borderChild} absolute w-full h-full`} />
                                    <div className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.bgColor} absolute left-0 top-0 w-6 h-6 flex justify-center items-center`}>
                                        <i className={`${answer.id === selectedAnswer.answer.id && selectedAnswer.icon} text-white`} />
                                    </div>
                                </>
                            )}
                            <div className="w-[108px] h-[108px] lg:w-[140px] lg:h-[140px] p-2 flex flex-col justify-center items-center">
                                {isKanjiToMeaning ? (
                                    <div>
                                        <p className="text-center font-light text-gray-900 capitalize text-xs lg:text-sm leading-4">{answer.meaning}</p>
                                        <p className="text-center font-light text-gray-700 text-[10px] lg:text-xs mt-1">{answer.hiragana}</p>
                                    </div>
                                ) : (
                                    <p className="text-center font-light text-gray-900 capitalize text-xs lg:text-xl leading-5">{answer.kanji}</p>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex justify-center my-5 lg:my-10">
                <button onClick={handleClickNext} disabled={isButtonNextDisabled} className={`${isButtonNextDisabled ? "bg-gray-500" : "bg-gray-500 hover:bg-gray-400 cursor-pointer"} px-10 py-2 text-white rounded`}>
                    Next
                </button>
            </div>
            {isModalSelectLevelOpen && <SelectLevel setCurrentLevel={setCurrentLevel} closeModal={() => setIsModalSelectLevelOpen(false)} />}
        </section>
    );
}
