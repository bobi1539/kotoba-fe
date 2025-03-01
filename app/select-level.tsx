"use client";

import Modal from "./component/modal/modal";

interface SelectLevelProps {
    closeModal: () => void;
}

export default function SelectLevel(props: Readonly<SelectLevelProps>) {
    return (
        <Modal title="Pilih Level" closeModal={props.closeModal} className="max-w-lg">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-b-gray-300 p-2">
                            <th className="text-left">Grup #</th>
                            <th className="text-center">1</th>
                            <th className="text-center">2</th>
                            <th className="text-center">3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="p-2">
                            <td>JLPT N5</td>
                            <td className="text-center">
                                <button className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">100</button>
                            </td>
                            <td className="text-center">
                                <button className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">100</button>
                            </td>
                            <td className="text-center">
                                <button className="w-9 h-9 bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">100</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Modal>
    );
}
