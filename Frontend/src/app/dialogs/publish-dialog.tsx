import { LoadingButton } from "@mui/lab";
import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { client } from "app/client";
import { Post } from "app/components/post";
import { PostModel } from "app/models/post-model";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { usePosts } from "app/providers/posts-provider";
import connectableApps from "assets/connectable-apps.json";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const PublishDialog = (props: PublishDialogProps) => {
  const { onDismiss, data, ...dialogProps } = props;
  const { open } = props;

  const { connectedApps } = useConnectedApps();

  const [schedule, setSchedule] = useState(dayjs(new Date()));
  const [scheduleMode, setScheduleMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { setPosts } = usePosts();

  useEffect(() => {
    if (open) {
      setSubmitting(false);
      setSchedule(dayjs(new Date()));
      setScheduleMode(false);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      onClose={() => onDismiss()}
    >
      {data && (
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Post data={data} publishMode />
              <Paper variant="outlined">
                <Stack spacing={2} p={2}>
                  {connectedApps?.map((app) => {
                    const x = connectableApps.find((b) => b.id === app.id);
                    return (
                      <img
                        src={x?.icon}
                        alt=""
                        key={app.id}
                        width={48}
                        height={48}
                      />
                    );
                  })}
                </Stack>
              </Paper>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Checkbox
                disabled={submitting}
                checked={scheduleMode}
                onChange={(evt) => {
                  setScheduleMode(evt.target.checked);
                }}
              />
              <Typography>Schedule for later</Typography>
            </Stack>
            {scheduleMode && (
              <DateTimePicker
                disabled={submitting}
                value={schedule}
                onChange={(value) => {
                  setSchedule(value!);
                }}
                label="Schedule your post"
                minDate={dayjs(new Date())}
              />
            )}
          </Stack>
        </DialogContent>
      )}
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <LoadingButton
          loading={submitting}
          onClick={() => {
            setSubmitting(true);
            client
              .post(
                "/data/publishPost",
                JSON.stringify({
                  id: data?.uuid,
                  config: [
                    {
                      appId: "my-socio",
                      schedule: scheduleMode ? schedule.toISOString() : null,
                    },
                  ],
                })
              )
              .then((response) => {
                if (response.status === 200) {
                  const post = JSON.parse(response.data) as PostModel;
                  setPosts((prev) => {
                    const updated = [...prev!];
                    const index = updated.findIndex(
                      (p) => p.uuid === post.uuid
                    );
                    if (index !== -1) {
                      updated[index] = post;
                    }
                    return updated;
                  });
                  onDismiss();
                }
              })
              .catch((err) => {
                setSubmitting(false);
              });
          }}
          variant="contained"
        >
          {scheduleMode && "Schedule"}
          {!scheduleMode && "Publish Now"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export interface PublishDialogProps extends DialogProps {
  data?: PostModel;
  onDismiss: () => void;
}
