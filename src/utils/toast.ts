import toast from "react-hot-toast";

export const successToast = (message: string) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
      fontFamily: "sans-serif",
    },
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#DC143C",
      color: "#fff",
      fontFamily: "sans-serif",
    },
  });
};
