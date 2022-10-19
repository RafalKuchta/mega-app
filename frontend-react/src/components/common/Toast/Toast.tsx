import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Toast = (message: string) => {
    toast.success(`${message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
    });
}