import { SESSION_TOKEN_KEY } from "./constants";
import { BrandProfileModel } from "./models/brand-profile-model";

export const isSignedIn = () => {
  return Boolean(localStorage.getItem(SESSION_TOKEN_KEY));
};

export const signIn = (sessionToken: string) => {
  localStorage.setItem(SESSION_TOKEN_KEY, sessionToken);
};

export const signOut = () => {
  localStorage.removeItem(SESSION_TOKEN_KEY);
};

export const naIfEmpty = (value: string) => {
  if (value.length === 0) {
    return "-";
  }
  return value;
};

export const isBrandProfileComplete = (brand: BrandProfileModel) => {
  return (
    brand.archeType.length !== 0 &&
    brand.brandVoice.length !== 0 &&
    brand.description.length !== 0 &&
    brand.name.length !== 0 &&
    brand.productCategory.length !== 0 &&
    brand.purposeStatement.length !== 0 &&
    brand.targetAgeRange.length !== 0 &&
    brand.targetCity.length !== 0 &&
    brand.targetGender.length !== 0 &&
    brand.vision.length !== 0
  );
};

const dateTimeFormatter = Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "medium",
});

export const formatDateTime = (value: string) => {
  const date = Date.parse(value);
  return dateTimeFormatter.format(date);
};
