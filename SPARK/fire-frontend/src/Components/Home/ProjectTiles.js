import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

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
    height: 11,
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
  divHeading: {
    color: "#e57373",
  },
  subHeading: {
    color: "#115293",
    fontWeight: "600",
  },
  desc: {
    color: "#7A8C98",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectTiles() {
  const classes = useStyles();
  const [openn, setOpenn] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function handleShow() {
    setShow((show) => !show);
  }

  const handleClickOpenn = () => {
    setOpenn(true);
    setShow((show) => !show);
  };

  //Only on first render
  useEffect(() => {
    notifyWelcome();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenn(false);
  };

  const notifyWelcome = () => {};

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Grid container spacing={4}>
          {featuredPosts.map((card) => (
            <Grid item key={card.title} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={card.image}
                  title={card.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.subHeading}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                    className={classes.desc}
                    gutterBottom
                  >
                    {card.description}
                  </Typography>

                  <CardActions>
                    <Button fullWidth variant="contained" color="secondary">
                      Contribute Now
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      align="center"
                      fullWidth
                      onClick={() => {
                        localStorage.setItem("f_title", card.title);
                        localStorage.setItem("f_readmore", card.readmore);
                        localStorage.setItem("f_image", card.image);
                        handleClickOpen();
                        // speak({ text: card.readmore,rate : 0.8})
                      }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <br />

        <br />
        <Typography variant="h5" className={classes.divHeading}>
          <b>Collaborate & Adopt!</b>
        </Typography>
        <Typography variant="body1" className={classes.desc}>
          Powered by Generative AI
        </Typography>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          maxWidth="lg"
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {localStorage.getItem("f_title")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {/* {localStorage.getItem("f_readmore")}
                    <br /> <br /> */}
              <center>
                <img
                  alt="fitness tip"
                  height="300px"
                  width="400px"
                  src={localStorage.getItem("f_image")}
                />
              </center>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </React.Fragment>
  );
}

const featuredPosts = [
  {
    title: "Virtual Personal Assistant",
    description:
      "Develop a sophisticated AI-based virtual assistant that leverages natural language processing and machine learning to efficiently manage tasks, appointments, and personalized recommendations for users, enhancing productivity and organization.",
    image:
      "https://cdn.mos.cms.futurecdn.net/67cf25041d647acdeb5f6ac68e09a991.jpg",
  },
  {
    title: "GenAI Healthcare Diagnosis",
    description:
      "Create an AI-driven diagnostic system that analyzes medical data, including images and patient records, to provide accurate and timely diagnoses, enabling healthcare professionals to make informed decisions and improve patient outcomes.",
    image:
      "https://imageio.forbes.com/blogs-images/bernardmarr/files/2018/07/AdobeStock_157266517-1200x640.jpeg?format=jpg&width=1200",
  },
  {
    title: "Driven Autonomous Vehicles",
    description:
      "Build an advanced AI system for self-driving cars, utilizing computer vision, sensor fusion, and deep learning algorithms to ensure safe and efficient navigation, revolutionizing the future of transportation.",
    image:
      "https://valientemott.com/wp-content/uploads/2020/05/self-driving-cars-1030x564.jpg",
  },

  {
    title: "Customer Service Chatbot",
    description:
      "Create an intelligent chatbot equipped with natural language understanding capabilities, machine learning, and sentiment analysis to deliver exceptional customer support, streamlining interactions and improving customer satisfaction for businesses.",
    image:
      "https://global-uploads.webflow.com/5d52bf3e2df046270672ae3b/6148448683ea0a6d42e27c3e_Customer%20Service%20Chatbots%20Hero.jpg",
  },
  {
    title: "Personalised Education Platform",
    description:
      "Design an AI-based educational platform that adapts to individual learning styles and preferences, offering personalized learning paths, assessments, and content recommendations to enhance student engagement and knowledge retention.",
    image:
      "https://er.educause.edu/-/media/images/articles/2016/3/erm1622article/32x13-related.jpg",
  },
];
