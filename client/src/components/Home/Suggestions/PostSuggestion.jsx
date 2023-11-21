import { useSuggestedPostsQuery } from "../../../features/posts/postapi";
import Loader from "../../Loader/Loader";
import PostSuggestionComponent from "./PostSuggestionComponent";

const PostSuggestion = () => {
  const { data, isLoading } = useSuggestedPostsQuery();
  return (
    <div className="my-8">
      <h1>Suggested posts</h1>
      {isLoading && <Loader />}
      {data && data.posts ? (
        data.posts.map((p) => <PostSuggestionComponent p={p} key={p._id} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostSuggestion;
