import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Home/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Spinner from "../Spinner";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TransferList from "./TransferList";
import ServiceCall from "../../Service/ServiceCall";
import AssistantIcon from "@material-ui/icons/Assistant";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import FileUpload from "react-material-file-upload";
import WorkspaceFeaturedPost from "./WorkspaceFeaturedPost";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Workspace() {
  const classes = useStyles();

  const [ideaPrompt, setIdeaPrompt] = useState([
    "Please help in ebalorating the idea by looking into the existing industry and market trends in 5 to 6 lines",
    "Prompt2",
  ]);

  const [loader, setLoader] = React.useState(false);
  const [ideaDetails, setIdeaDetails] = useState();
  const [elaboratedIdea, setElaboratedIdea] = useState();
  const [problemStatement, setProblemStatement] = useState();
  const [proposedSolution, setProposedSolution] = useState();
  const [innovationModules, setInnovationModules] = useState();
  const [marketResearch, setMarketResearch] = useState();
  const [keyProblem, setKeyProblem] = useState();
  const [personas, setPersonas] = useState();

  const [file1, setFile1] = useState();
  const [file, setFile] = useState();
  const [file2, setFile2] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleIdeaField = (event) => {
    setIdeaDetails(event.target.value);
  };

  function handleIdeaDetails() {
    console.log(ideaDetails);
    setLoader(true);
    ServiceCall.generateIdeaDetails(ideaDetails).then((response) => {
      console.log(response.data);
      setElaboratedIdea(response.data.data);
      setLoader(false);
    });
  }

  function handleElaboratedIdeaDetails() {
    setLoader(true);
    ServiceCall.generateProblemStatement(elaboratedIdea).then((response) => {
      console.log(response.data);
      setProblemStatement(response.data.data);
      setLoader(false);
    });
  }

  function handleProblemStatement() {
    console.log(elaboratedIdea);
    setLoader(true);
    var ideaProblemDetails = elaboratedIdea + problemStatement;
    ServiceCall.generateProposedSolution(ideaProblemDetails).then(
      (response) => {
        console.log(response.data);
        setProposedSolution(response.data.data);
        setLoader(false);
      }
    );
  }

  function handleProposedSolution() {
    console.log(elaboratedIdea);
    setLoader(true);
    var ideaProblemDetails =
      elaboratedIdea + problemStatement + proposedSolution;
    ServiceCall.generateInnovationModules(ideaProblemDetails).then(
      (response) => {
        console.log(response.data);
        setInnovationModules(response.data.data);
        setLoader(false);
      }
    );
  }

  function handleInnovationModule() {
    setLoader(true);
    var backgroundData =
      elaboratedIdea + problemStatement + proposedSolution + innovationModules;
    ServiceCall.generateMarketResearch(backgroundData).then((response) => {
      console.log(response.data);
      setMarketResearch(response.data.data);
      setLoader(false);
    });
  }

  function handleMarkeResearch() {
    setLoader(true);
    var backgroundData =
      elaboratedIdea +
      problemStatement +
      proposedSolution +
      innovationModules +
      marketResearch;
    ServiceCall.generateKeyProblems(backgroundData).then((response) => {
      console.log(response.data);
      setKeyProblem(response.data.data);
      setLoader(false);
    });
  }

  function handleKeyProblem() {
    setLoader(true);
    var backgroundData =
      elaboratedIdea +
      problemStatement +
      proposedSolution +
      innovationModules +
      marketResearch +
      keyProblem;
    ServiceCall.generateUserStakeholders(backgroundData).then((response) => {
      console.log(response.data);
      setPersonas(response.data.data);
      setLoader(false);
    });
  }

  const handleFileChange = (event) => {
    setFile(event);
  };

  const handleFileChange1 = (event) => {
    setFile1(event);
  };

  const handleFileChange2 = (event) => {
    setFile2(event);
  };

  const handleChange = event => {
    setElaboratedIdea(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {loader && <Spinner></Spinner>}
      <Header title="FIRE: From Ideas to Reality powered by Generative AI" />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {
            "Do you wish to customise your Prompt? Prompt Engineering is the key to everything!"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              id="outlined-multiline-static"
              label="Your Prompt"
              multiline
              rows={6}
              fullWidth
              value={ideaPrompt[0]}
              variant="outlined"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <main>
        <WorkspaceFeaturedPost post={mainFeaturedPost} /> <center></center>
        <Container maxWidth align="center">
          <div className={classes.avatarRoot}>
            <Typography color="primary" variant="h6" gutterBottom>
              <b>
                <i>Workspace Contributors:</i>
              </b>
            </Typography>
            <Avatar
              alt="Remy Sharp"
              src="https://media.licdn.com/dms/image/C4D03AQF9mLPOG-UkSA/profile-displayphoto-shrink_400_400/0/1595870041988?e=1695859200&v=beta&t=3yeqGiFHW80XksNBszcVUzr54lE1RMxx2VrtGZyMr40"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/C4D03AQH_eyBZ31bdCA/profile-displayphoto-shrink_400_400/0/1627129228561?e=1695859200&v=beta&t=9kyL0kmxVFlvI2Z6vK6jvBEqvlCnLXqhQi6yAjmlvko"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/D4D03AQEhAsaviJSCMg/profile-displayphoto-shrink_100_100/0/1682155391773?e=1695859200&v=beta&t=huJhWXZpOCDUeQHVFZqYMV0GHCsodDZ1jAcObxKhToc"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://media.licdn.com/dms/image/D4E03AQHLgz81wUXPmg/profile-displayphoto-shrink_100_100/0/1669743796427?e=1695859200&v=beta&t=WC6mcR7NXaOibvUfjxI8pn5PA9vuCVNfgoIqbMzs83A"
            />
            <Avatar
              alt="Remy Sharp"
              src="https://media.licdn.com/dms/image/C4D03AQFZzlKALf-yhg/profile-displayphoto-shrink_100_100/0/1663861197639?e=1695859200&v=beta&t=6v8E0N_NrnNbHjMtXITy2elUdtp4oOnkNLic2UkCP1s"
            />
            <Avatar
              alt="Travis Howard"
              src="https://media.licdn.com/dms/image/C5603AQHU-WsNy7f7Og/profile-displayphoto-shrink_100_100/0/1613056323665?e=1695859200&v=beta&t=bQ9GF1UsmPAB3OyDbag7IxFVfFHjXoDxL605i3ag3dk"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://media.licdn.com/dms/image/D4D03AQHyG7KEszqt3Q/profile-displayphoto-shrink_100_100/0/1675850258776?e=1695859200&v=beta&t=tNrpkzpbt6tNE-rdhasnuj21vKLTh6pPMWfcLrl6L9o"
            />
            <Typography color="primary" variant="h6" gutterBottom>
              <b>
                <i>Connect with Collaboration Tools:</i>
              </b>
            </Typography>
            <AvatarGroup max={6}>
              <Avatar
                alt="Travis Howard"
                src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://cdn-icons-png.flaticon.com/512/5968/5968875.png"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://asset.brandfetch.io/idAnDTFapY/idYC5f2L1X.png"
              />
              <Avatar
                alt="Cindy Baker"
                src="https://seeklogo.com/images/M/monday-logo-918DBDD43D-seeklogo.com.png"
              />
              <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
                <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
                <Avatar
                alt="Cindy Baker"
                src=" https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png "
              />
            </AvatarGroup>
          </div>
          <br />
          <Grid container spacing={3}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Business & Domain related documents</b>
                      </Typography>
                      <FileUpload
                        value={file}
                        accept="application/pdf"
                        onChange={handleFileChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Consulting report and competitor lists</b>
                      </Typography>
                      <FileUpload
                        value={file1}
                        accept="application/pdf"
                        onChange={handleFileChange1}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography color="secondary" variant="h6" gutterBottom>
                        <b>Budget details, team structure & expertise</b>
                      </Typography>
                      <FileUpload
                        value={file2}
                        accept="application/pdf"
                        onChange={handleFileChange2}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={2}>
                      <EmojiObjectsIcon
                        color="secondary"
                        fontSize="medium"
                      ></EmojiObjectsIcon>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h6" gutterBottom>
                        If you have an Idea then don't let an idiot talk you out
                        of it!
                      </Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Idea"
                    multiline
                    rows={12}
                    defaultValue={"Please add your Idea here ..."}
                    fullWidth
                    value={ideaDetails}
                    variant="outlined"
                    onChange={(e) => handleIdeaField(e)}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={2}>
                      <AssistantIcon
                        color="secondary"
                        fontSize="large"
                        onClick={handleClickOpen}
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleIdeaDetails}
                      >
                        Enhance IDEA using FIRE-AI
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={2}>
                      <WbIncandescentIcon color="secondary" fontSize="medium" />
                    </Grid>
                    <Grid item xs={10}>
                      <Typography variant="h6" gutterBottom>
                        Elaborated version of your idea using FIRE Generative AI
                      </Typography>
                    </Grid>
                  </Grid>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Elaborated version of Your Idea"
                    multiline
                    rows={12}
                    fullWidth
                    value={elaboratedIdea}
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleElaboratedIdeaDetails}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <br /> <br />
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Big Elephant in the room?
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your problem statement"
                    multiline
                    rows={12}
                    fullWidth
                    variant="outlined"
                    value={problemStatement}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleProblemStatement}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Proposed Solution Summary
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Proposed Solution"
                    multiline
                    rows={12}
                    fullWidth
                    variant="outlined"
                    value={proposedSolution}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleProposedSolution}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Business Benefits
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Innovation Modules"
                    multiline
                    rows={12}
                    fullWidth
                    variant="outlined"
                    value={innovationModules}
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleInnovationModule}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <br /> <br />
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Markert Research of the Problem
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Market Research"
                    multiline
                    rows={12}
                    fullWidth
                    value={marketResearch}
                    variant="outlined"
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleMarkeResearch}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Key Problems Identified
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Your Key Problems"
                    multiline
                    rows={12}
                    fullWidth
                    value={keyProblem}
                    variant="outlined"
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleKeyProblem}
                      >
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Stakeholders & User Personas
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Key Personas"
                    multiline
                    rows={12}
                    fullWidth
                    value={personas}
                    variant="outlined"
                  />
                  <br /> <br />
                  <Grid container item xs={12} spacing={2}>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" color="secondary">
                        Chain Stage
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <br /> <br />
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={6}>
                <Button
                  style={{ color: "white", backgroundColor: "black" }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Please choose Product Modules for the idea generated by
                  FIRE-AI
                </Button>
                <TransferList />
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.paper}>
                  <Typography variant="h6" gutterBottom>
                    Code Generation
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    (GenerativeAI)
                  </Typography>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-multiline-static"
                    label="Code Generation"
                    multiline
                    rows={12}
                    fullWidth
                    defaultValue="Start coding"
                    variant="outlined"
                  />
                  <br /> <br />
                  <Button fullWidth variant="contained" color="primary">
                    Update
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

const mainFeaturedPost = {
  title: "Project Workspace",
  description:
    "Collaborate with across divisions, teams & colleagues using the power of Generative AI",
  image:
    "https://media.licdn.com/dms/image/D5612AQG-FsJ_6TJPuA/article-cover_image-shrink_720_1280/0/1679628763431?e=2147483647&v=beta&t=6cM4C82xiRe7XMavhoNQYGsjSd2ZgrAsE4StFT8J_VE",
  imgText: "main image description",
  linkText: "Continue reading…",
};
