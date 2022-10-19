import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ToastError = (message: string) => {
  toast.error(`${message}`, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
}