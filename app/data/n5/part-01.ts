import { Kotoba } from "@/app/dto/kotoba-kanji";

export const getKotobaListPart01 = (): Kotoba[] => {
    return kotobaListPart01;
};

const kotobaListPart01: Kotoba[] = [
    {
        id: 1,
        kanji: "おはよう",
        hiragana: "おはよう",
        meaning: "selamat pagi",
    },
    {
        id: 2,
        kanji: "おはようございます",
        hiragana: "おはようございます",
        meaning: "selamat pagi",
    },
    {
        id: 3,
        kanji: "こんにちは",
        hiragana: "こんにちは",
        meaning: "selamat siang / halo",
    },
    {
        id: 4,
        kanji: "こんばんは",
        hiragana: "こんばんは",
        meaning: "selamat malam",
    },
    {
        id: 5,
        kanji: "おやすみなさい",
        hiragana: "おやすみなさい",
        meaning: "selamat tidur",
    },
    {
        id: 6,
        kanji: "さようなら",
        hiragana: "さようなら",
        meaning: "sampai jumpa lagi",
    },
    {
        id: 7,
        kanji: "でわ",
        hiragana: "でわ",
        meaning: "permisi / kalau begitu / baiklah",
    },
    {
        id: 8,
        kanji: "じゃあ / じゃ",
        hiragana: "じゃあ / じゃ",
        meaning: "permisi / kalau begitu / baiklah",
    },
    {
        id: 9,
        kanji: "じゃあ, また",
        hiragana: "じゃあ, また",
        meaning: "sampai ketemu lagi",
    },
    {
        id: 10,
        kanji: "じゃあ, またあした",
        hiragana: "じゃあ, またあした",
        meaning: "sampai jumpa besok",
    },
];
