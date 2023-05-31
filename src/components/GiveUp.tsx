import { useState } from "react";

const GiveUp = () => {
    // states
    const [open, setOpen] = useState(false);

    // functions
    function handleOpenModal() {
        setOpen(true);
    }

    function handleCloseModal() {
        setOpen(false);
    }

    return (
        <div>
            <button
                onClick={handleOpenModal}
                className="px-4 py-1 rounded-md bg-slate-500 text-white font-semibold ring-2 ring-offset-2 ring-slate-500 active:scale-95 transition-transform duration-100 text-sm"
            >
                Give up
            </button>
        </div>
    );
};

export default GiveUp;
