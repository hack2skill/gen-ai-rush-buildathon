import { UserModel } from "app/models/user-model";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

const userContext = createContext<BrandProfileContextProps>({
  setUser: () => {},
});

export const UserProvider = userContext.Provider;

export const useUser = () => useContext(userContext);

export interface BrandProfileContextProps {
  user?: UserModel;
  setUser: Dispatch<SetStateAction<UserModel | undefined>>;
}
