import { Kotoba } from "@/app/dto/kotoba-kanji";

export const getKotobaListN5Part03 = (): Kotoba[] => {
    return kotobaListN5Part03;
};

const kotobaListN5Part03: Kotoba[] = [
    {
        id: 1,
        kanji: "五日",
        hiragana: "いつか",
        meaning: "tanggal 5",
    },
    {
        id: 2,
        kanji: "六日",
        hiragana: "むいか",
        meaning: "tanggal 6",
    },
    {
        id: 3,
        kanji: "七日",
        hiragana: "なのか",
        meaning: "tanggal 7",
    },
];
