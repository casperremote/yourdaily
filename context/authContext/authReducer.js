/* eslint-disable import/no-anonymous-default-export */
export const AUTH_LOGIN = "auth_login";
export const AUTH_LOADING = "auth_login";
export const AUTH_ERROR = "auth_error";

export default (state, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        auth_token: action.payload,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case AUTH_LOADING: {
      return {
        ...state,
        isLoggedIn: false,
        loading: true,
        error: false,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
