import "izitoast/dist/css/iziToast.min.css";
import iZtoast from "izitoast";

const AppToast = {
  error: (message, title = "Error") => {
    return iZtoast.error({
      title: title,
      message: message,
      position: "bottomCenter"
    });
  },
  success: (message, title = "Hecho") => {
    return iZtoast.success({
      title: title,
      message: message,
      position: "bottomCenter"
    });
  }
};

export default AppToast;
