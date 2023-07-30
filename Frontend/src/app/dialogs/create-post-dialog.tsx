import { AttachFile, Image, SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { client } from "app/client";
import { languageTypes } from "app/data/language-types";
import { postTypes } from "app/data/post-types";
import { useBrandProfile } from "app/providers/brand-profile-provider";
import { usePosts } from "app/providers/posts-provider";
import { isBrandProfileComplete } from "app/utils";
import { saveAs } from "file-saver";
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const CreatePostDialog = (props: CreatePostDialogProps) => {
  const { onDismiss, ...dialogProps } = props;
  const { open } = props;

  const [mode, setMode] = useState<"scratch" | "ai">("scratch");

  const [scratchCaption, setScratchCaption] = useState("");
  const [scratchImageFile, setScratchImageFile] = useState<File | null>(null);
  const [scratchImageSrc, setScratchImageSrc] = useState<any>(null);

  const [aiPostType, setAiPostType] = useState("");
  const [aiPostLanguage, setAiPostLanguage] = useState("");
  const [aiImageFile, setAiImageFile] = useState<File | null>(null);
  const [aiImageSrc, setAiImageSrc] = useState<any>(null);
  const [aiImageDescription, setAiImageDescription] = useState("");
  const [aiCaption, setAiCaption] = useState("");
  const [aiImageResults, setAiImageResults] = useState<string[]>();

  const [submittingPost, setSubmittingPost] = useState(false);

  const scratchImgRef = useRef<HTMLInputElement>(null);
  const aiImgRef = useRef<HTMLInputElement>(null);

  const { setPosts } = usePosts();

  const canGenerateAIImages = useMemo(() => {
    return (
      aiPostType.length > 0 && aiPostLanguage.length > 0 && Boolean(aiImageFile)
    );
  }, [aiImageFile, aiPostLanguage, aiPostType]);

  const canGenerateAICaption = useMemo(() => {
    return canGenerateAIImages && aiImageDescription.length > 0;
  }, [aiImageDescription, canGenerateAIImages]);

  const randomInt = useCallback((num: number) => {
    return Math.floor(Math.random() * num);
  }, []);

  useEffect(() => {
    if (open) {
      setScratchCaption("");
      setScratchImageFile(null);
      setScratchImageSrc(null);
      setSubmittingPost(false);

      setAiCaption("");
      setAiImageDescription("");
      setAiImageFile(null);
      setAiImageSrc(null);
      setAiPostLanguage("");
      setAiPostType("");
      setAiImageResults(undefined);
    }
  }, [open]);

  const { brandProfile } = useBrandProfile();

  const prompt = useMemo(() => {
    const colorPallete = ["Off White", "Fuchsia Pink"][randomInt(2)];
    const object = ["Silk Sheets", "wooden pedestal"][randomInt(2)];
    const lighting = [
      "Studio",
      "Natural",
      "Soft",
      "Backlight",
      "Diffused warm",
    ][randomInt(5)];
    const setting = [
      "(inspired by) Beach",
      "nature with trees",
      "pearl on a beach",
      "sunset on beach",
    ][randomInt(5)];
    const photographyType = [
      "premium product photoshoot",
      "studio product photoshoot",
      "classic product photoshoot",
      "product photoshoot",
    ][randomInt(4)];
    const detail = ["Highly detailed", "blur background"][randomInt(2)];
    const elements = ["plants", "flowers"][randomInt(2)];
    const background = ["Silk Sheets", "Sea inspired", "Snow Fall Inspired"][
      randomInt(3)
    ];

    const negativePrompts =
      "text, pearl, out of frame, ugly, distorted, dry plants";

    const prompt =
      `a premium product photoshoot + fuchsia pink silk sheets + highly detailed + studio lighting inspired by pearl on a sea beach`.trim();
    return prompt;
  }, [randomInt]);

  const captionAiPrompt = useMemo(() => {
    return "A wooden product photoshoot pedestal inspired by sunset on the beach, beach plants, studio lighting, highly detailed, sea inspired background";
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      {...dialogProps}
      onClose={() => {
        if (!submittingPost) {
          onDismiss();
        }
      }}
    >
      <DialogTitle>Create a post</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <ToggleButtonGroup
            disabled={submittingPost}
            fullWidth
            size="small"
            value={mode}
          >
            <ToggleButton
              onClick={() => {
                setMode("scratch");
              }}
              value={"scratch"}
            >
              Scratch Mode
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                setMode("ai");
              }}
              disabled={!isBrandProfileComplete(brandProfile!)}
              value={"ai"}
            >
              AI Mode{" "}
              {!isBrandProfileComplete(brandProfile!)
                ? "(Profile Incomplete)"
                : ""}
            </ToggleButton>
          </ToggleButtonGroup>
          {mode === "scratch" && (
            <Fragment>
              <TextField
                disabled={submittingPost}
                value={scratchCaption}
                onChange={(evt) => {
                  setScratchCaption(evt.target.value);
                }}
                multiline
                minRows={3}
                maxRows={5}
                label="Caption"
              />
              <input
                disabled={submittingPost}
                ref={scratchImgRef}
                onChange={(evt) => {
                  if (evt.target.files?.item(0)) {
                    const file = evt.target.files.item(0);
                    setScratchImageFile(file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file!);
                    reader.addEventListener("load", () => {
                      setScratchImageSrc(reader.result);
                    });
                  }
                }}
                hidden
                type="file"
                accept="image/*"
              />
              {scratchImageSrc && (
                <img src={scratchImageSrc} alt="" width="100%" />
              )}
              <Button
                disabled={submittingPost}
                onClick={() => {
                  if (!scratchImageSrc) {
                    scratchImgRef.current && scratchImgRef.current.click();
                  } else {
                    setScratchImageSrc(null);
                    setScratchImageFile(null);
                  }
                }}
                variant="outlined"
                startIcon={<AttachFile />}
              >
                {scratchImageFile && "Remove Image"}
                {!scratchImageFile && "Add Image"}
              </Button>
            </Fragment>
          )}
          {mode === "ai" && (
            <Fragment>
              <TextField
                disabled={submittingPost}
                select
                fullWidth
                label="Post Type"
                value={aiPostType}
                onChange={(evt) => {
                  setAiPostType(evt.target.value);
                }}
              >
                {postTypes.map((value) => {
                  return (
                    <MenuItem
                      key={value}
                      value={value}
                      disabled={value.length === 0}
                    >
                      {value.length === 0 ? "Select an option" : value}
                    </MenuItem>
                  );
                })}
              </TextField>
              <TextField
                disabled={submittingPost}
                select
                fullWidth
                label="Post Language"
                value={aiPostLanguage}
                onChange={(evt) => {
                  setAiPostLanguage(evt.target.value);
                }}
              >
                {languageTypes.map((value) => {
                  return (
                    <MenuItem
                      key={value}
                      value={value}
                      disabled={value.length === 0}
                    >
                      {value.length === 0 ? "Select an option" : value}
                    </MenuItem>
                  );
                })}
              </TextField>
              <input
                disabled={submittingPost}
                ref={aiImgRef}
                onChange={(evt) => {
                  if (evt.target.files?.item(0)) {
                    const file = evt.target.files.item(0);
                    setAiImageFile(file);
                    setAiImageResults(undefined);
                    const reader = new FileReader();
                    reader.readAsDataURL(file!);
                    reader.addEventListener("load", () => {
                      setAiImageSrc(reader.result);
                    });
                  }
                }}
                hidden
                type="file"
                accept="image/*"
              />
              {aiImageSrc && <img src={aiImageSrc} alt="" width="100%" />}
              <Button
                disabled={submittingPost}
                onClick={() => {
                  aiImgRef.current && aiImgRef.current.click();
                }}
                startIcon={<Image />}
                variant="outlined"
              >
                Set Image
              </Button>
              {aiImageResults && (
                <Typography>
                  Generated the following images. Click to download and set the
                  image to use
                </Typography>
              )}
              {aiImageResults &&
                aiImageResults.map((imageUrl) => {
                  return (
                    <img
                      src={imageUrl}
                      alt=""
                      onClick={() => {
                        fetch(imageUrl)
                          .then((response) => response.blob())
                          .then((blob) => {
                            saveAs(blob);
                          })
                          .catch(() => {});
                      }}
                    />
                  );
                }, [])}
              {canGenerateAIImages && (
                <Button
                  onClick={() => {
                    setSubmittingPost(true);
                    const formData = new FormData();
                    formData.append("prompt", prompt);
                    formData.append("image", aiImageFile!);
                    client
                      .post("/data/createai", formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      .then((response) => {
                        if (response.status === 200) {
                          setSubmittingPost(false);
                          setAiImageResults(JSON.parse(response.data).urls);
                        }
                      })
                      .catch((err) => {
                        console.log("Error");
                        setSubmittingPost(false);
                      });
                  }}
                  disabled={submittingPost}
                  variant="contained"
                >
                  Generate AI Product Image Versions
                </Button>
              )}
              <Divider />
              <TextField
                disabled={submittingPost}
                fullWidth
                label="Image Description"
                onChange={(evt) => {
                  setAiImageDescription(evt.target.value);
                }}
                multiline
                minRows={3}
                maxRows={4}
              />
              <TextField
                disabled={submittingPost}
                fullWidth
                label="Caption"
                multiline
                minRows={4}
                maxRows={4}
                value={aiCaption}
                onChange={(evt) => setAiCaption(evt.target.value)}
              />
              {canGenerateAICaption && (
                <Button
                  onClick={() => {
                    setSubmittingPost(true);
                    client
                      .post(
                        "/data/captionsai",
                        JSON.stringify({
                          prompt: captionAiPrompt,
                        })
                      )
                      .then((response) => {
                        if (response.status === 200) {
                          const data = JSON.parse(response.data);
                          setAiCaption(data.prompt);
                          setSubmittingPost(false);
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        setSubmittingPost(false);
                      });
                  }}
                  disabled={submittingPost}
                  variant="contained"
                >
                  Generate AI Caption
                </Button>
              )}
            </Fragment>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        {mode === "scratch" && (
          <Button
            onClick={() => {
              setSubmittingPost(true);
              const formData = new FormData();
              formData.append("content", scratchCaption);
              if (scratchImageFile) {
                formData.append("image", scratchImageFile);
              }
              client
                .post("/data/post", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  if (response.status === 200) {
                    setPosts((prev) => [...prev!, JSON.parse(response.data)]);
                    onDismiss();
                  }
                })
                .catch(() => {});
            }}
            variant="outlined"
            startIcon={<SaveOutlined />}
            disabled={scratchCaption.length === 0 || submittingPost}
          >
            Save Draft
          </Button>
        )}
        {mode === "ai" && (
          <Button
            onClick={() => {
              setSubmittingPost(true);
              const formData = new FormData();
              formData.append("content", aiCaption);
              if (scratchImageFile) {
                formData.append("image", aiImageFile!);
              }
              client
                .post("/data/post", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((response) => {
                  if (response.status === 200) {
                    setPosts((prev) => [...prev!, JSON.parse(response.data)]);
                    onDismiss();
                  }
                })
                .catch(() => {});
            }}
            variant="outlined"
            startIcon={<SaveOutlined />}
            disabled={
              submittingPost ||
              aiPostType.length === 0 ||
              aiPostLanguage.length === 0 ||
              aiCaption.length === 0 ||
              aiImageDescription.length === 0 ||
              !aiImageFile
            }
          >
            Save Draft
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export interface CreatePostDialogProps extends DialogProps {
  onDismiss: () => void;
}
