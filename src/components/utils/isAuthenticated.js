export const isAuthenticated = () => {
  if(typeof window == "undefined"){
      return false
  }
    if (!!localStorage.getItem("Authorization")) {
    return localStorage.getItem("Authorization");
  } else {
    return false;
  }
};

