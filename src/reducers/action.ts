import { LOGIN_TYPE } from "./login";
export const login = (data: Boolean) => {
  return {
    type: LOGIN_TYPE,
    data,
  };
};
