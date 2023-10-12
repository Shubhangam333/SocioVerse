import DashBoardListing from "../DashBoard/DashBoardListing";
import PostFeed from "../PostFeed/PostFeed";
import Suggestion from "../Suggestions/Suggestion";

const Main = () => {
  return (
    <div className="main m-auto grid grid-cols-8  my-24">
      <DashBoardListing />
      <PostFeed />
      <Suggestion />
    </div>
  );
};

export default Main;
