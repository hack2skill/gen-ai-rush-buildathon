import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { client } from "app/client";
import { ConnectableApp } from "app/components/connectable-app";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import connectableApps from "assets/connectable-apps.json";

export const AddAppDialog = (props: AddAppDialogProps) => {
  const { onDismiss, ...dialogProps } = props;
  const { connectedApps, setConnectedApps } = useConnectedApps();

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      onClose={() => onDismiss()}
    >
      <DialogTitle>Select an app to add</DialogTitle>
      <DialogContent>
        <Grid2 container>
          {connectableApps
            .filter((a) => {
              return connectedApps?.findIndex((b) => b.id === a.id) === -1;
            })
            .map((app) => {
              return (
                <Grid2 xs={2} key={app.id} spacing={2}>
                  <ConnectableApp
                    {...app}
                    onClick={() => {
                      client
                        .post(
                          "/data/connectApp",
                          JSON.stringify({
                            id: app.id,
                          })
                        )
                        .then((response) => {
                          if (response.status === 200) {
                            setConnectedApps((prev) => {
                              return [...prev!, { id: app.id }];
                            });
                            onDismiss();
                          }
                        });
                    }}
                  />
                </Grid2>
              );
            })}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export interface AddAppDialogProps extends DialogProps {
  onDismiss: () => void;
}
