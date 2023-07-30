import { Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { useUser } from "app/providers/user-provider";
import { useMemo } from "react";
import { PostModel } from "../models/post-model";
import { formatDateTime } from "../utils";

export const Post = (props: PostProps) => {
  const { data } = props;

  const formattedSchedule = useMemo(
    () =>
      data.mode === "DRAFT"
        ? null
        : data.schedule
        ? `${
            data.mode === "SCHEDULED" ? "Scheduled for" : "Published on"
          }: ${formatDateTime(data.schedule)}`
        : undefined,
    [data.mode, data.schedule]
  );

  const { user } = useUser();
  const { connectedApps } = useConnectedApps();

  return (
    <Box variant="outlined" component={Card}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {user!.email[0].toUpperCase()}
          </Avatar>
        }
        title={user!.email}
        subheader={formattedSchedule}
      />
      {data.imageUrl && (
        <CardMedia
          component="img"
          alt=""
          sx={{ aspectRatio: "16 / 9", userSelect: "none" }}
          image={data.imageUrl}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.caption}
        </Typography>
      </CardContent>
      {!props.publishMode && (
        <CardActions disableSpacing>
          {data.mode === "DRAFT" && (
            <Button
              disabled={connectedApps!.length === 0}
              endIcon={<Send />}
              onClick={props.onClick}
              color="success"
              sx={{ ml: "auto" }}
              variant="contained"
            >
              {connectedApps!.length === 0 && "No Connected Apps"}
              {connectedApps!.length > 0 && "Publish"}
            </Button>
          )}
        </CardActions>
      )}
    </Box>
  );
};

export interface PostProps {
  data: PostModel;
  onClick?: () => void;
  publishMode?: boolean;
}
