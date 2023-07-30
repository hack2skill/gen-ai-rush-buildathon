import { ConnectedAppModel } from "app/models/connected-app-model";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

const connectedAppsContext = createContext<ConnectedAppsContextProps>({
  setConnectedApps: () => {},
});

export const ConnectedAppsProvider = connectedAppsContext.Provider;

export const useConnectedApps = () => useContext(connectedAppsContext);

export interface ConnectedAppsContextProps {
  connectedApps?: ConnectedAppModel[];
  setConnectedApps: Dispatch<SetStateAction<ConnectedAppModel[] | undefined>>;
}
