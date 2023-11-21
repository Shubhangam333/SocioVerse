import { Link } from "react-router-dom";

const PostSuggestionComponent = ({ p }) => {
  const truncated = p.content.slice(0, 90);

  return (
    <div className="p-4 shadow-2xl">
      <Link to={`/post/${p._id}`}>
        <div>
          <img
            src={p.images[0].url}
            alt="post-photo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </Link>
      <p className="text-justify">
        {truncated}{" "}
        <span className="text-blue-500 hover:underline">
          <Link to={`/post/${p._id}`}>Read More</Link>
        </span>
      </p>
    </div>
  );
};

export default PostSuggestionComponent;
