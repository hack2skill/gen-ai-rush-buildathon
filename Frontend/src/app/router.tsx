import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./pages/dashboard-page";
import { BrandingProfileSection } from "./pages/sections/branding-profile-section";
import { ConnectedAppsSection } from "./pages/sections/connected-apps-section";
import { PostsSection } from "./pages/sections/posts-section";
import { SignInPage } from "./pages/sign-in-page";
import { SignUpPage } from "./pages/sign-up-page";
import { isSignedIn } from "./utils";

export const Router = () => {
  return (
    <Routes>
      <Route
        path="/signin"
        element={isSignedIn() ? <Navigate to="/dashboard" /> : <SignInPage />}
      />
      <Route
        path="/register"
        element={isSignedIn() ? <Navigate to="/dashboard" /> : <SignUpPage />}
      />
      <Route
        path="/dashboard"
        element={isSignedIn() ? <DashboardPage /> : <Navigate to="/signin" />}
      >
        <Route path="posts" element={<PostsSection />} />
        <Route path="branding-profile" element={<BrandingProfileSection />} />
        <Route path="connected-apps" element={<ConnectedAppsSection />} />
        <Route index path="*" element={<Navigate to="posts" />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};
