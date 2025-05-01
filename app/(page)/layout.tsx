"use client";

import { useMemo, useState } from "react";
import Navbar from "../component/navbar/navbar";
import { AnswerStatus, startingAnswerStatus } from "../dto/answer-status";
import SelectLevel from "../select-level";
import { N5_01 } from "../constant/general";
import { KotobaContext } from "../context/kotoba-context";

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout(props: Readonly<PageLayoutProps>) {
    const [isModalSelectLevelOpen, setIsModalSelectLevelOpen] = useState<boolean>(false);
    const [isKanjiToMeaning, setIsKanjiToMeaning] = useState<boolean>(true);
    const [currentLevel, setCurrentLevel] = useState<string>(N5_01);
    const [answerStatus, setAnswerStatus] = useState<AnswerStatus>(startingAnswerStatus());

    const kotobaContextValue = useMemo(
        () => ({
            currentLevel,
            isKanjiToMeaning,
            setIsKanjiToMeaning,
            answerStatus,
            setAnswerStatus,
        }),
        [currentLevel, isKanjiToMeaning, setIsKanjiToMeaning, answerStatus, setAnswerStatus]
    );

    return (
        <KotobaContext.Provider value={kotobaContextValue}>
            <div>
                <div>
                    <Navbar isModalSelectLevelOpen={isModalSelectLevelOpen} setIsModalSelectLevelOpen={setIsModalSelectLevelOpen} />
                </div>
                <div>{props.children}</div>
                {isModalSelectLevelOpen && <SelectLevel setCurrentLevel={setCurrentLevel} closeModal={() => setIsModalSelectLevelOpen(false)} />}
            </div>
        </KotobaContext.Provider>
    );
}
