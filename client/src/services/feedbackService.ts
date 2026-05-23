import { Bounce, toast, Zoom } from "react-toastify";

export function sucessMassage(massege: string) {
  toast.success(massege, {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
}

export function errorMessage(massege: string) {
  toast.error(massege, {
    position: "top-center",
    autoClose: 6000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
