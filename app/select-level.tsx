"use client";

import Modal from "./component/modal/modal";
import { N5_01, N5_02, N5_03 } from "./constant/general";
import { JLPTLevel } from "./dto/jlpt-level";

interface SelectLevelProps {
    closeModal: () => void;
    setCurrentLevel: (level: string) => void;
}

export default function SelectLevel(props: Readonly<SelectLevelProps>) {
    const jlptLevelList: JLPTLevel[] = [
        {
            name: "JLPT N5",
            list: [N5_01, N5_02, N5_03],
        },
    ];

    const handleClickSetCurrentLevel = (level: string): void => {
        console.log("level : ", level);
        props.setCurrentLevel(level);
        props.closeModal();
    };

    return (
        <Modal title="Pilih Level" closeModal={props.closeModal} className="max-w-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-b-gray-300 p-2">
                            <th className="text-left">Grup #</th>
                            <th className="text-center w-10">1</th>
                            <th className="text-center w-10">2</th>
                            <th className="text-center w-10">3</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jlptLevelList.map((jlptLevel) => (
                            <tr key={jlptLevel.name} className="p-2">
                                <td>{jlptLevel.name}</td>
                                {jlptLevel.list.map((level, index) => (
                                    <td key={index + 1} className="text-center p-1">
                                        <button onClick={() => handleClickSetCurrentLevel(level)} className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
                                            100
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
