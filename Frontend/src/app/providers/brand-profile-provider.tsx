import { BrandProfileModel } from "app/models/brand-profile-model";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

const brandProfileContext = createContext<BrandProfileContextProps>({
  setBrandProfile: () => {},
});

export const BrandProfileProvider = brandProfileContext.Provider;

export const useBrandProfile = () => useContext(brandProfileContext);

export interface BrandProfileContextProps {
  brandProfile?: BrandProfileModel;
  setBrandProfile: Dispatch<SetStateAction<BrandProfileModel | undefined>>;
}
