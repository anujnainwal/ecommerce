import { FiX } from "react-icons/fi";

interface DrawerProps {
  dynamicWidth?: string;
  withBackdrop?: boolean;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  direction?: "ltr" | "rtl"; // Added direction prop
  topStyle: string;
  zIndex: string;
}

const Drawer: React.FC<DrawerProps> = ({
  dynamicWidth = "w-64",
  withBackdrop = false,
  isOpen,
  onClose,
  title,
  content,
  direction = "ltr", // Default to 'ltr'
  topStyle,
  zIndex,
}) => {
  const handleBackdropClick = () => {
    if (withBackdrop) onClose();
  };

  return (
    <div
      className={`bg-white ${direction === "rtl" ? "rtl" : "ltr"} ${topStyle}`}
    >
      <div
        // className={`fixed inset-0 flex ${
        //   withBackdrop ? "bg-black bg-opacity-50" : ""
        // } ${isOpen ? "z-40" : "-z-10"} `}
        className={`fixed inset-0 flex ${
          withBackdrop ? "bg-black bg-opacity-50" : ""
        } z-999999-important ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } transition-opacity duration-300`}
      >
        <div
          className={`absolute top-0 ${
            direction === "rtl" ? "right-0" : "left-0"
          } transition-transform duration-300 ease-in-out ${dynamicWidth} bg-[#fff] h-full shadow-lg`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <button onClick={onClose} className="text-gray-500">
              <FiX className="text-2xl" />
            </button>
          </div>
          {/* Drawer Content */}
          <div className="p-2">{content}</div>
        </div>
      </div>

      {/* Outside Click Handler */}
      {withBackdrop && (
        <div
          className={`fixed inset-0 ${isOpen ? "block" : "hidden"}`}
          onClick={handleBackdropClick}
        ></div>
      )}
    </div>
  );
};

export default Drawer;
