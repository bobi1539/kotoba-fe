"use client";

import { useKotobaContext } from "@/app/context/kotoba-context";
import { getSelectLevelMap } from "@/app/util/helper";

export default function KotobaTable() {
    const { currentLevel } = useKotobaContext();
    const dataKotobaList = getSelectLevelMap().get(currentLevel) ?? [];

    return (
        <div className="overflow-x-auto m-2 lg:mx-10 lg:my-5">
            <table className="w-full text-left text-gray-600 text-xs lg:text-xl">
                <thead className="text-black uppercase bg-gray-100">
                    <tr>
                        <th className="text-center p-2">No</th>
                        <th>Kanji</th>
                        <th>Hiragana</th>
                        <th>Arti</th>
                    </tr>
                </thead>
                <tbody>
                    {dataKotobaList.map((kotoba, index) => (
                        <tr key={kotoba.id} className="border-b border-gray-300">
                            <td className="text-center p-1">{index + 1}</td>
                            <td>{kotoba.kanji}</td>
                            <td>{kotoba.hiragana}</td>
                            <td>{kotoba.meaning}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="h-20"/>
        </div>
    );
}
