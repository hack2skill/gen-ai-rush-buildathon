import { EmailOutlined, PasswordOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Fade,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { client } from "app/client";
import { Page } from "app/components/page";
import { SignInResponseModel } from "app/models/sign-in-response-model";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { useConnectedApps } from "app/providers/connected-apps-provider";
import { usePosts } from "app/providers/posts-provider";
import { useUser } from "app/providers/user-provider";
import { signIn } from "app/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

export const SignUpPage = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signingUp, setSigningUp] = useState(false);

  const { setUser } = useUser();
  const { setBrandProfile } = useBrandProfile();
  const { setConnectedApps } = useConnectedApps();
  const { setPosts } = usePosts();

  return (
    <Page sx={{ overflow: "auto" }}>
      <Fade appear in>
        <Paper
          sx={{ m: "auto" }}
          component={Stack}
          direction="column"
          minWidth="0px"
          maxWidth="400px"
          width="100%"
          spacing={2}
          padding={2}
        >
          <Typography variant="h6">Sign Up</Typography>
          <Typography variant="body1" color="text.secondary">
            Please enter the following to create an account
          </Typography>
          <TextField
            disabled={signingUp}
            placeholder="Email"
            fullWidth
            InputProps={{ startAdornment: <EmailOutlined sx={{ mr: 2 }} /> }}
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
              setErrorMessage(null);
            }}
          />
          <TextField
            disabled={signingUp}
            placeholder="Password"
            type="password"
            fullWidth
            InputProps={{ startAdornment: <PasswordOutlined sx={{ mr: 2 }} /> }}
            value={password}
            onChange={(evt) => {
              setPassword(evt.target.value);
              setErrorMessage(null);
            }}
          />
          {errorMessage && (
            <Typography variant="caption" color="red">
              {errorMessage}
            </Typography>
          )}
          <Box />
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Button
              disabled={signingUp}
              onClick={() => navigate("/signin")}
              variant="text"
            >
              Login instead
            </Button>
            <LoadingButton
              loading={signingUp}
              onClick={() => {
                setSigningUp(true);
                console.log("Hello");
                client
                  .post(
                    "/register",
                    JSON.stringify({
                      email: email,
                      password: password,
                    })
                  )
                  .then((response) => {
                    if (response.status === 200) {
                      const signInResponse = JSON.parse(
                        response.data
                      ) as SignInResponseModel;
                      signIn(signInResponse.sessionToken);

                      setUser(signInResponse.user);
                      setBrandProfile(signInResponse.brandProfile);
                      setPosts(signInResponse.posts);
                      setConnectedApps(signInResponse.connectedApps ?? []);

                      window.location.reload();
                    }
                  })
                  .catch(() => {
                    setErrorMessage("Something went wrong");
                    setSigningUp(false);
                  });
              }}
              variant="contained"
              disabled={!email || !password}
            >
              Sign Up
            </LoadingButton>
          </Stack>
        </Paper>
      </Fade>
    </Page>
  );
};
