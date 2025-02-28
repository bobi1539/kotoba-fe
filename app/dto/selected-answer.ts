import { Kotoba } from "./kotoba-kanji";

export interface SelectedAnswer {
    isCorrect: boolean;
    borderParent: string;
    borderChild: string;
    bgColor: string;
    icon: string;
    answer: Kotoba;
}
