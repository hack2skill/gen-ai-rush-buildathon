import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Section } from "app/components/section";
import { AddAppDialog } from "app/dialogs/add-app-dialog";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { Fragment, useState } from "react";
import connectableApps from "assets/connectable-apps.json";
import { ConnectableApp } from "app/components/connectable-app";

export const ConnectedAppsSection = () => {
  const { connectedApps } = useConnectedApps();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Fragment>
      <Section heading="Connected Apps">
        <Stack p={2} spacing={2}>
          <Typography color="text.secondary">
            {connectedApps!.length === 0
              ? "You do not have any connected apps"
              : `You have ${connectedApps?.length} connected app`}
          </Typography>
          <Grid2 container spacing={2}>
            {connectedApps?.map((app) => {
              const a = connectableApps.find(
                (connectableApp) => connectableApp.id === app.id
              );
              return (
                <Grid2 key={app.id} sm={4} lg={2} sx={{ aspectRatio: "1/1" }}>
                  <ConnectableApp {...a!} />
                </Grid2>
              );
            })}
            <Grid2 sm={4} lg={2} sx={{ aspectRatio: "1/1" }}>
              <Button
                onClick={() => setDialogOpen(true)}
                fullWidth
                variant="outlined"
                sx={{ height: "100%" }}
              >
                <Add fontSize="large" />
              </Button>
            </Grid2>
          </Grid2>
        </Stack>
      </Section>
      <AddAppDialog open={dialogOpen} onDismiss={() => setDialogOpen(false)} />
    </Fragment>
  );
};
