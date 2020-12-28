import { Action } from "../types/global";

export const LOGIN_TYPE = "login";

const INITIAL_STATE = {
  login: false,
};

export default function global(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case LOGIN_TYPE:
      return {
        ...state,
        login: action.data,
      };
    default:
      return state;
  }
}
