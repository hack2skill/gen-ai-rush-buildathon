import { Box, CircularProgress, Typography } from "@mui/material";
import { client } from "app/client";
import { Page } from "app/components/page";
import { SideBar } from "app/components/side-bar";
import { DataResponseModel } from "app/models/data-response-model";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { usePosts } from "app/providers/posts-provider";
import { useUser } from "app/providers/user-provider";
import { Fragment, useEffect, useMemo } from "react";
import { Outlet } from "react-router";

export const DashboardPage = () => {
  const { user, setUser } = useUser();
  const { setBrandProfile } = useBrandProfile();
  const { setConnectedApps } = useConnectedApps();
  const { setPosts } = usePosts();

  const hasUserData = useMemo(() => Boolean(user), [user]);

  useEffect(() => {
    if (!hasUserData) {
      const abortController = new AbortController();
      client
        .get("/data/data", {
          signal: abortController.signal,
        })
        .then((response) => {
          if (response.status === 200) {
            const dataResponse = JSON.parse(response.data) as DataResponseModel;
            setUser(dataResponse.user);
            setBrandProfile(dataResponse.brandProfile);
            setConnectedApps(dataResponse.connectedApps ?? []);
            setPosts(dataResponse.posts);
          }
        })
        .catch((err) => {});
      return () => abortController.abort();
    }
  }, [hasUserData, setBrandProfile, setConnectedApps, setPosts, setUser]);

  if (!hasUserData) {
    return (
      <Page>
        <Box
          m="auto"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <CircularProgress />
          <Typography variant="h6">Loading</Typography>
        </Box>
      </Page>
    );
  }

  return (
    <Fragment>
      <Page>
        <Box
          display="flex"
          flexDirection="row"
          flex={1}
          height="0px"
          alignItems="stretch"
        >
          <SideBar />
          <Outlet />
        </Box>
      </Page>
    </Fragment>
  );
};
