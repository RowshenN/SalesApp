export const token = () => {
    if (JSON.parse(localStorage.getItem("SalesApp"))) {
      var data = JSON.parse(localStorage.getItem("SalesApp"));
      return data.token;
    }
};
  