import { PostModel } from "app/models/post-model";
import { Dispatch, SetStateAction, createContext, useContext } from "react";

const postsContext = createContext<PostsContextProps>({
  setPosts: () => {},
});

export const PostsProvider = postsContext.Provider;

export const usePosts = () => useContext(postsContext);

export interface PostsContextProps {
  posts?: PostModel[];
  setPosts: Dispatch<SetStateAction<PostModel[] | undefined>>;
}
