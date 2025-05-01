import { createContext, useContext } from "react";
import { AnswerStatus } from "../dto/answer-status";

export const KotobaContext = createContext<{
    currentLevel: string;
    isKanjiToMeaning: boolean;
    setIsKanjiToMeaning: React.Dispatch<React.SetStateAction<boolean>>;
    answerStatus: AnswerStatus;
    setAnswerStatus: React.Dispatch<React.SetStateAction<AnswerStatus>>;
} | null>(null);

export const useKotobaContext = () => {
    const context = useContext(KotobaContext);
    if (!context) throw new Error("useKotoba must be used inside KotobaContext.Provider");
    return context;
};
