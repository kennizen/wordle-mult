import { createPortal } from "react-dom";

interface IProps {
  children: React.ReactNode;
  onClose?: () => void;
  open?: boolean;
}

const Modal = ({ children, onClose, open }: IProps) => {
  return open
    ? createPortal(
        <div
          onClick={onClose}
          className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-md shadow-md">
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
