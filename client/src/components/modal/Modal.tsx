import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <div className={`mb-3 flex gap-3 ${!isOpen && "hidden"}`}>
      <button
        data-dialog-target="modal-sm"
        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
        type="button"
        onClick={onClose} // Call onClose to open the modal
      >
        Open Modal SM
      </button>

      <div
        data-dialog-backdrop="modal-sm"
        data-dialog-backdrop-close="true"
        className={`pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : ""
        }`}
      >
        <div
          data-dialog="modal-sm"
          className="relative m-4 p-4 w-1/3 rounded-lg bg-white shadow-sm"
        >
          <div className="flex shrink-0 items-center pb-4 text-xl font-medium text-slate-800">
            {title}
          </div>
          <div className="relative border-t border-slate-200 py-4 leading-normal text-slate-600 font-light">
            {content}
          </div>
          <div className="flex shrink-0 flex-wrap items-center pt-4 justify-end">
            <button
              data-dialog-close="true"
              className="rounded-md border border-transparent py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              data-dialog-close="true"
              className="rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="button"
              onClick={onClose}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
