import {
  Add,
  AppsOutlined,
  Check,
  CommentOutlined,
  Logout,
  StarOutline,
  Warning,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { useUser } from "app/providers/user-provider";
import { isBrandProfileComplete, signOut } from "app/utils";
import { Fragment, ReactNode, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AppLogo } from "./app-logo";
import { CreatePostDialog } from "app/dialogs/create-post-dialog";

const drawerWidth = 300;

const SideBarButton = (props: SideBarButtonProps) => {
  return (
    <ListItem disablePadding divider>
      <ListItemButton selected={props.selected} onClick={props.onClick}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText>{props.title}</ListItemText>
        {props.trailing}
      </ListItemButton>
    </ListItem>
  );
};

interface SideBarButtonProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  trailing?: ReactNode;
  selected?: boolean;
}

export const SideBar = () => {
  const drawerSx = useMemo(
    () => ({
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
    }),
    []
  );

  const { pathname } = useLocation();
  const currentSection = useMemo(() => pathname.split("/")?.at(2), [pathname]);
  const navigate = useNavigate();

  const { user } = useUser();
  const { brandProfile } = useBrandProfile();
  const { connectedApps } = useConnectedApps();

  const [openPostDialog, setOpenPostDialog] = useState(false);

  return (
    <Fragment>
      <Drawer variant="permanent" open sx={drawerSx}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          width="100%"
          alignItems="stretch"
        >
          <AppLogo />
          <Box p={2}>
            <Button
              onClick={() => {
                setOpenPostDialog(true);
              }}
              startIcon={<Add />}
              fullWidth
              variant="outlined"
            >
              Compose new post
            </Button>
          </Box>
          <Divider />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            height={0}
            flex={1}
            overflow="auto"
          >
            <SideBarButton
              selected={currentSection === "posts"}
              icon={<CommentOutlined />}
              title="Posts"
              onClick={() => {
                if (currentSection !== "posts") {
                  navigate("posts");
                }
              }}
            />
            <SideBarButton
              selected={currentSection === "branding-profile"}
              icon={<StarOutline />}
              title="Branding Profile"
              onClick={() => {
                if (currentSection !== "branding-profile") {
                  navigate("branding-profile");
                }
              }}
              trailing={
                !isBrandProfileComplete(brandProfile!) ? (
                  <Tooltip
                    arrow
                    placement="right"
                    title="You need to complete your brand profile for AI post generation"
                  >
                    <Warning color="warning" />
                  </Tooltip>
                ) : (
                  <Check color="success" />
                )
              }
            />
            <SideBarButton
              selected={currentSection === "connected-apps"}
              icon={<AppsOutlined />}
              title="Connected Apps"
              onClick={() => {
                if (currentSection !== "connected-apps") {
                  navigate("connected-apps");
                }
              }}
              trailing={
                connectedApps!.length === 0 ? (
                  <Tooltip
                    arrow
                    placement="right"
                    title="You need to connect atleast one app to publish or schedule posts"
                  >
                    <Warning color="warning" />
                  </Tooltip>
                ) : (
                  <Check color="success" />
                )
              }
            />
          </Box>
          <Divider />
          <Stack direction="row" padding={2} spacing={1.5} alignItems="center">
            <Avatar variant="rounded" sx={{ width: 24, height: 24 }} />
            <Typography
              flex={1}
              width={0}
              textOverflow="ellipsis"
              variant="body2"
              sx={{
                maxLines: 1,
                overflow: "hidden",
              }}
            >
              {user?.email}
            </Typography>
            <IconButton
              onClick={() => {
                signOut();
                window.location.reload();
              }}
              size="small"
            >
              <Logout />
            </IconButton>
          </Stack>
        </Box>
      </Drawer>
      <CreatePostDialog
        open={openPostDialog}
        onDismiss={() => setOpenPostDialog(false)}
      />
    </Fragment>
  );
};
