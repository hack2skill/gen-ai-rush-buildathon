import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Post } from "app/components/post";
import { Section } from "app/components/section";
import { PublishDialog } from "app/dialogs/publish-dialog";
import { PostModel } from "app/models/post-model";
import { usePosts } from "app/providers/posts-provider";
import { useMemo, useState } from "react";

export const PostsSection = () => {
  const { posts } = usePosts();

  const draftPosts = useMemo(() => {
    return posts?.filter((post) => post.mode === "DRAFT");
  }, [posts]);

  const scheduledPosts = useMemo(() => {
    return posts?.filter((post) => post.mode === "SCHEDULED");
  }, [posts]);

  const publishedPosts = useMemo(() => {
    return posts?.filter((post) => post.mode === "PUBLISHED");
  }, [posts]);

  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [publishablePost, setPublishablePost] = useState<PostModel>();

  return (
    <Section heading="Posts">
      <Stack p={2} spacing={6}>
        <Stack width="100%" spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            Drafts
          </Typography>
          {draftPosts?.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              You have no saved drafts
            </Typography>
          )}
          {draftPosts!.length > 0 && (
            <Grid2 container lg={4} spacing={2}>
              {draftPosts!.map((post) => {
                return (
                  <Grid2 key={post.uuid}>
                    <Post
                      data={post}
                      onClick={() => {
                        setPublishablePost(post);
                        setPublishDialogOpen(true);
                      }}
                    />
                  </Grid2>
                );
              })}
            </Grid2>
          )}
        </Stack>
        <Stack width="100%" spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            Scheduled Posts
          </Typography>
          {scheduledPosts?.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              You have no scheduled posts
            </Typography>
          )}
          {scheduledPosts!.length > 0 && (
            <Grid2 container lg={4} spacing={2}>
              {scheduledPosts!.map((post) => {
                return (
                  <Grid2 key={post.uuid}>
                    <Post data={post} />
                  </Grid2>
                );
              })}
            </Grid2>
          )}
        </Stack>
        <Stack width="100%" spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            Published Posts
          </Typography>
          {publishedPosts?.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              You have no published posts
            </Typography>
          )}
          {publishedPosts!.length > 0 && (
            <Grid2 container lg={4} spacing={2}>
              {publishedPosts!.map((post) => {
                return (
                  <Grid2 key={post.uuid}>
                    <Post data={post} />
                  </Grid2>
                );
              })}
            </Grid2>
          )}
        </Stack>
      </Stack>
      <PublishDialog
        open={publishDialogOpen}
        data={publishablePost}
        onDismiss={() => {
          setPublishDialogOpen(false);
          setPublishablePost(undefined);
        }}
      />
    </Section>
  );
};
