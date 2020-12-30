import { Action } from "../types/global";

export const LOGIN_TYPE = "login";

const INITIAL_STATE = {
  isLogin: !!window.sessionStorage.getItem('isLogin'),
};

export default function global(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case LOGIN_TYPE:
      window.sessionStorage.setItem('isLogin', action.data.toString())
      return {
        ...state,
        isLogin: action.data,
      };
    default:
      return state;
  }
}
