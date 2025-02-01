import toast from "react-hot-toast";

type AlertType = "success" | "error" | "info";

const customHotAlert = (type: AlertType, message: string): void => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};

export default customHotAlert;
