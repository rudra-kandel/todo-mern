//Set Token
function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh_token", token?.refresh);
  }
}

//Get Token
function getToken() {
  try {
    return {
      access: localStorage.getItem("token") ?? "",
      refresh: localStorage.getItem("refresh_token") ?? "",
    };
  } catch (e) {
    return null;
  }
}

//Get Token Details
function getTokenDetails() {
  try {
    const token = getToken();
    return token && token.access
      ? JSON.parse(window.atob(token.access.split(".")[1]))
      : null;
  } catch (e) {
    return null;
  }
}

//Clear Token
function clear_token() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
}

//Authentication
function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

//Exports
const tokenService = {
  setToken,
  getToken,
  isAuthenticated,
  clear_token,
};

export default tokenService;
