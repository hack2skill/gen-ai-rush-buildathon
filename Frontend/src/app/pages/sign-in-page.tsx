import { EmailOutlined, Login, PasswordOutlined } from "@mui/icons-material";
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

export const SignInPage = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signingIn, setSigningIn] = useState(false);

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
          <Typography variant="h6">Welcome to Smart Socio</Typography>
          <Typography variant="body1" color="text.secondary">
            Please enter your credentials to sign in
          </Typography>
          <TextField
            disabled={signingIn}
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
            disabled={signingIn}
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
              disabled={signingIn}
              onClick={() => navigate("/register")}
              variant="text"
            >
              New User?
            </Button>
            <LoadingButton
              loading={signingIn}
              disabled={!email || !password}
              onClick={() => {
                setSigningIn(true);
                setErrorMessage(null);
                client
                  .post(
                    "/data/signin",
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
                    } else if (response.status === 401) {
                      setErrorMessage("Invalid email / password");
                      setSigningIn(false);
                    }
                  })
                  .catch(() => {
                    setErrorMessage("Something went wrong");
                    setSigningIn(false);
                  });
              }}
              startIcon={<Login />}
              variant="contained"
            >
              Sign In
            </LoadingButton>
          </Stack>
        </Paper>
      </Fade>
    </Page>
  );
};
