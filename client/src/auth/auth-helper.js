const authHelper = {
  isAuthenticated() {
    if (localStorage.getItem("auth")) return true;
    return false;
  },
  extractAuth() {
    if (localStorage.getItem("auth")) {
      return localStorage.getItem("auth");
    }
    return false;
  },
};

export default authHelper;
