import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Spinner from "../Spinner";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ProjectTiles from "./ProjectTiles";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  search: {
    margin: theme.spacing(1),
    width: 600,
  },
  root: {
    maxWidth: 1055,
  },
  media: {
    height: 140,
  },
}));

export default function Home() {
  const classes = useStyles();

  const [username, setusername] = React.useState();
  const [loader, setLoader] = React.useState(false);
  const [summary, setsummary] = React.useState("No Record Found");
  const [likedislike, setlikedislike] = React.useState("No Record Found");
  const [personality, setpersonality] = React.useState("No Record Found");
  const [keywords, setkeywords] = React.useState("No Record Found");

  return (
    <React.Fragment>
      <CssBaseline />
      {loader && <Spinner></Spinner>}
      <Header title="FIRE: From Ideas to Reality powered by Generative AI" />
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />

        <TextField
          id="standard-basic"
          variant="outlined"
          multiline
          style={{ margin: 40, width: 700 }}
          placeholder="FIRE Search"
          onChange={(e) => setusername(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon /> {/*  */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </main>

      <br />

      <Container align="center">
        <Grid container spacing={2} align="center">
          <ProjectTiles />
        </Grid>
      </Container>
      <br />
    </React.Fragment>
  );
}

const mainFeaturedPost = {
  title: "FIRE: From Ideas to Reality",
  description:
    "Innovation Portal revolutionizing ideation to development adoption process by leveraging the power of Generative AI. ",
  image:
    "https://www.nibm.lk/wp-content/uploads/2021/10/banner-vishwapasla-4.jpg",
  imgText: "main image description",
  linkText: "Continue reading…",
};
