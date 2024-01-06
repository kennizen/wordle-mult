interface IPorps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const KeyboardButton = ({ children, onClick }: IPorps) => {
    return (
        <button
            onClick={onClick}
            className="px-4 py-2 bg-slate-300 font-bold text-center rounded-md uppercase flex-1 min-w-max active:bg-slate-400 outline-none hover:ring-2 ring-slate-400"
        >
            {children}
        </button>
    );
};

export default KeyboardButton;
