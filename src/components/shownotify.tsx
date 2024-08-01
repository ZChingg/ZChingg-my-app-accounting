import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 提示訊息
const showNotify = (status: string, content: string) => {
    const notifySetting = {
      position: "top-center" as ToastPosition,
      autoClose: 5000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
    };
  
    if (status === "success") {
      toast.success(content, notifySetting);
    } else if (status === "error") {
      toast.error(content, notifySetting);
    }
  };

export default showNotify;