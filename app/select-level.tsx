"use client";

import Modal from "./component/modal/modal";
import { N5_01, N5_02 } from "./constant/general";

interface SelectLevelProps {
    closeModal: () => void;
    setCurrentLevel: (level: string) => void;
}

export default function SelectLevel(props: Readonly<SelectLevelProps>) {
    const handleClickSetCurrentLevel = (level: string): void => {
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
                            <th className="text-center">1</th>
                            <th className="text-center">2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="p-2">
                            <td>JLPT N5</td>
                            <td className="text-center">
                                <button onClick={() => handleClickSetCurrentLevel(N5_01)} className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
                                    100
                                </button>
                            </td>
                            <td className="text-center">
                                <button onClick={() => handleClickSetCurrentLevel(N5_02)} className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
                                    100
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
