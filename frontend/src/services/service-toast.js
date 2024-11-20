import { colors } from "@themes/colors";
import toast from "react-hot-toast";

// Common options
const commonOptions = {
  stack: 10,
  position: "bottom-center",
  duration: 4000,
};

//Common styles
const commonStyles = {
  padding: "12px",
  border: "1px solid",
};

const toastSuccess = (message) => {
  toast.success(message, {
    id: message,
    style: {
      ...commonStyles,
      borderColor: colors.toastSuccess,
    },
    ...commonOptions,
  });
};

const toastFail = (message) => {
  toast.error(message, {
    id: message,
    style: {
      ...commonStyles,
      borderColor: colors.toastError,
    },
    ...commonOptions,
  });
};

const toastPromise = (
  promiseAction,
  id,
  loadingMessage,
  successMessage,
  errorMessage,
) => {
  return toast.promise(
    promiseAction,
    {
      loading: loadingMessage || "Saving...",
      success: successMessage || "Success!",
      error: errorMessage || "Error!",
    },
    {
      id,
      ...commonOptions,
    },
  );
};

export { toastFail, toastPromise, toastSuccess };
