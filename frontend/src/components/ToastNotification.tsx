import { Flip, toast } from "react-toastify";

const defaultToastOptions = {
  className: "custom-toast",
  autoClose: 3000,
  // hideProgressBar: true,
  transition: Flip,
};

export const toastSuccess = (message: React.ReactNode, options = {}) => {
    toast.success(message, { ...defaultToastOptions, ...options });
}

export const toastError = (message: React.ReactNode, options = {}) => {
    toast.error(message, { ...defaultToastOptions, ...options });
}

export const toastInfo = (message: React.ReactNode, options = {}) => {
    toast.info(message, { ...defaultToastOptions, ...options });
}

export const toastWarning = (message: React.ReactNode, options = {}) => {
    toast.warning(message, { ...defaultToastOptions, ...options });
}
