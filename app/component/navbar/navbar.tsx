"use client";

import { ENDPOINT_KOTOBA_TABLE, ENDPOINT_PRACTICE } from "@/app/constant/endpoint";
import { useKotobaContext } from "@/app/context/kotoba-context";
import { useRouter } from "next/navigation";

interface NavbarProps {
    isModalSelectLevelOpen: boolean;
    setIsModalSelectLevelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navbar(props: Readonly<NavbarProps>) {
    const { isKanjiToMeaning, setIsKanjiToMeaning, answerStatus } = useKotobaContext();
    const router = useRouter();

    return (
        <div className="lg:flex lg:justify-between bg-gray-200 border-gray-500 font-light">
            <div className="flex justify-between w-full">
                <div className="flex">
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
                    <div className="lg:py-2 py-1 pl-1 flex gap-1">
                        <button onClick={() => router.push(ENDPOINT_PRACTICE)} className="bg-gray-500 hover:bg-gray-400 cursor-pointer px-5 py-1 text-white rounded flex justify-center items-center gap-2">
                            Latihan
                        </button>
                        <button onClick={() => router.push(ENDPOINT_KOTOBA_TABLE)} className="bg-gray-500 hover:bg-gray-400 cursor-pointer px-5 py-1 text-white rounded flex justify-center items-center gap-2">
                            Tabel
                        </button>
                    </div>
                </div>

                <div className="lg:py-2 py-1 pr-1">
                    <button onClick={() => props.setIsModalSelectLevelOpen(!props.isModalSelectLevelOpen)} className="bg-gray-500 hover:bg-gray-400 cursor-pointer px-5 py-1 text-white rounded">
                        Level
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
    );
}
