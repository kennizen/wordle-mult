import { useState } from "react";
import Modal from "./Modal";
import { ReactComponent as CheckIcon } from "../assets/icons/check.svg";

interface IProps {
  rid: string;
}

const InvitePlayerModal = ({ rid }: IProps) => {
  // states
  const [copied, setCopied] = useState(false);

  // consts
  const inviteLink = `${import.meta.env.VITE_CLIENT_URL}/versus?room=${rid}`;

  // handlers
  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
    } catch (error) {
      console.error(error);
      setCopied(false);
    }
  }

  return (
    <Modal open>
      <div className="p-4">
        <div className="flex items-center gap-x-4 mb-4">
          <p className="p-2 bg-gray-50 rounded-md border border-gray-300 max-w-xs overflow-auto whitespace-nowrap">{inviteLink}</p>
          <button
            onClick={handleCopyInviteLink}
            className={`${
              copied
                ? "bg-green-50 border-green-500 text-green-500"
                : "bg-blue-50 border-blue-500 text-blue-500 hover:bg-blue-100"
            } p-2 border rounded-md transition-[background-color] duration-100 flex items-center gap-x-1`}
          >
            {copied ? (
              <>
                <CheckIcon width={16} height={16} className="fill-green-500" /> {"Copied"}
              </>
            ) : (
              "Copy invite link"
            )}
          </button>
        </div>
        <div className="flex items-center mb-4 flex-col gap-y-4">
          <p>Waiting for other player to join...</p>
          <span className="loader"></span>
        </div>
      </div>
    </Modal>
  );
};

export default InvitePlayerModal;
