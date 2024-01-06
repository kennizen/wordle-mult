import { useState } from "react";
import Modal from "./Modal";
import { useSetRecoilState } from "recoil";
import { loseConditionAtom } from "../store/atoms";

const GiveUp = () => {
  // states
  const [open, setOpen] = useState(false);
  const setLoseCondition = useSetRecoilState(loseConditionAtom);

  // functions
  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function handleShowAnswer() {
    setLoseCondition(true);
    handleCloseModal();
  }

  return (
    <div>
      <button
        onClick={handleOpenModal}
        className="px-4 py-1 rounded-md bg-slate-500 text-white font-semibold ring-2 ring-offset-2 ring-slate-500 active:scale-95 transition-transform duration-100 text-sm"
      >
        Give up
      </button>
      <Modal open={open} onClose={handleCloseModal}>
        <div className="flex flex-col p-4 gap-y-6">
          <p className="font-semibold text-xl">Are you sure you want to give up?</p>
          <div className="flex items-center justify-end gap-x-4">
            <button
              onClick={handleShowAnswer}
              className="px-4 py-1 outline outline-2 outline-slate-200 rounded-md hover:outline-slate-300"
            >
              Yes
            </button>
            <button onClick={handleCloseModal} className="px-4 py-1 bg-slate-200 rounded-md hover:bg-slate-300">
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GiveUp;
