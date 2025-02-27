"use client";

import { useEffect, useState } from "react";

interface KotobaKanji {
    id: number;
    kanji: string;
    hiragana: string;
    meaning: string;
}

export default function Home() {
    const [question, setQuestion] = useState<KotobaKanji>();
    const [answers, setAnswers] = useState<KotobaKanji[]>([]);

    useEffect(() => {
        const kotobaKanjiList: KotobaKanji[] = [
            {
                id: 1,
                kanji: "家",
                hiragana: "いえ",
                meaning: "rumah",
            },
            {
                id: 2,
                kanji: "友達",
                hiragana: "ともだち",
                meaning: "teman",
            },
            {
                id: 3,
                kanji: "猫",
                hiragana: "ねこ",
                meaning: "kucing",
            },
            {
                id: 4,
                kanji: "犬",
                hiragana: "いぬ",
                meaning: "anjing",
            },
            {
                id: 5,
                kanji: "車",
                hiragana: "くるま",
                meaning: "mobil",
            },
            {
                id: 6,
                kanji: "靴",
                hiragana: "くつ",
                meaning: "sepatu",
            },
            {
                id: 7,
                kanji: "傘",
                hiragana: "かさ",
                meaning: "payung",
            },
            {
                id: 8,
                kanji: "食べ物",
                hiragana: "たべもの",
                meaning: "makanan",
            },
            {
                id: 9,
                kanji: "水",
                hiragana: "みず",
                meaning: "air",
            },
            {
                id: 10,
                kanji: "火",
                hiragana: "ひ",
                meaning: "api",
            },
            {
                id: 11,
                kanji: "本",
                hiragana: "ほん",
                meaning: "buku",
            },
            {
                id: 12,
                kanji: "本屋",
                hiragana: "ほにや",
                meaning: "toko buku",
            },
            {
                id: 13,
                kanji: "切符",
                hiragana: "きっぷ",
                meaning: "tiket",
            },
            {
                id: 14,
                kanji: "学生",
                hiragana: "がくせい",
                meaning: "murid",
            },
            {
                id: 15,
                kanji: "先生",
                hiragana: "せんせい",
                meaning: "guru",
            },
        ];
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
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers.slice(0, count); // Get a `count` number of unique numbers
    };

    return (
        <section className="border border-red-500 bg-gray-100 w-full h-screen grid grid-cols-2 gap-20 pt-52">
            <div className="border border-gray-800 w-[450px] h-[450px] bg-white flex justify-center items-center justify-self-end">
                <p className="text-[100px]">{question?.kanji}</p>
            </div>
            <div className="w-[450px] h-[450px] grid grid-cols-3 gap-3">
                {answers.map((answer) => (
                    <div key={answer.id} className="border border-gray-800 bg-white flex justify-center items-center p-3 hover:cursor-pointer">
                        <div>
                            <p className="text-center font-light text-gray-900 capitalize">{answer.meaning}</p>
                            <p className="text-center font-light text-gray-700 text-sm">{answer.hiragana}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
