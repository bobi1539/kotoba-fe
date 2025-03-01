interface ModalProps {
    title: string;
    children: React.ReactNode;
    closeModal: () => void;
    className?: string;
}

export default function Modal(props: Readonly<ModalProps>) {
    return (
        <div className="flex overflow-y-hidden overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-screen max-h-full bg-gray-900/50 ">
            <div className={`${props.className} relative w-full max-h-full p-4 bg-white rounded-lg shadow m-4 overflow-y-auto`}>
                <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">{props.title}</h3>
                    <button onClick={props.closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 ml-auto inline-flex justify-center items-center w-7 h-7">
                        <i className="fa-solid fa-xmark fa-lg"></i>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    );
}
