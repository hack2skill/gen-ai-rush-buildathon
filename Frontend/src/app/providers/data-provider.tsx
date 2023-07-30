import React, { useState } from "react";
import { UserProvider } from "./user-provider";
import { BrandProfileProvider } from "./brand-profile-provider";
import { PostsProvider } from "./posts-provider";
import { ConnectedAppsProvider } from "./connected-apps-provider";
import { UserModel } from "app/models/user-model";
import { BrandProfileModel } from "app/models/brand-profile-model";
import { PostModel } from "app/models/post-model";
import { ConnectedAppModel } from "app/models/connected-app-model";

export const DataProvider = (props: DataProviderProps) => {
  const [user, setUser] = useState<UserModel>();
  const [brandProfile, setBrandProfile] = useState<BrandProfileModel>();
  const [posts, setPosts] = useState<PostModel[]>();
  const [connectedApps, setConnectedApps] = useState<ConnectedAppModel[]>();

  return (
    <UserProvider value={{ user, setUser }}>
      <BrandProfileProvider value={{ brandProfile, setBrandProfile }}>
        <PostsProvider value={{ posts, setPosts }}>
          <ConnectedAppsProvider value={{ connectedApps, setConnectedApps }}>
            {props.children}
          </ConnectedAppsProvider>
        </PostsProvider>
      </BrandProfileProvider>
    </UserProvider>
  );
};

export interface DataProviderProps {
  children?: React.ReactNode;
}
