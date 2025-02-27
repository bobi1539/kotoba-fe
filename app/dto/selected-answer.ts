import { KotobaKanji } from "./kotoba-kanji";

export interface SelectedAnswer {
    isCorrect: boolean;
    borderParent: string;
    borderChild: string;
    bgColor: string;
    icon: string;
    answer: KotobaKanji;
}
