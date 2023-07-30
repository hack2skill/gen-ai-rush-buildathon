import { BrandProfileModel } from "./brand-profile-model";
import { ConnectedAppModel } from "./connected-app-model";
import { PostModel } from "./post-model";
import { UserModel } from "./user-model";

export interface SignInResponseModel {
  sessionToken: string;
  user: UserModel;
  brandProfile: BrandProfileModel;
  posts: PostModel[];
  connectedApps: ConnectedAppModel[];
}
