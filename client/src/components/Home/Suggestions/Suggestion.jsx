import { useState } from "react";
import { useUserSuggestionQuery } from "../../../features/profile/profileapi";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PostSuggestion from "./PostSuggestion";

const Suggestion = () => {
  const { data, isLoading, isSuccess } = useUserSuggestionQuery();

  const [usersuggestion, setUserSuggestion] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setUserSuggestion(data.users);
    }
  }, [data, isSuccess]);
  return (
    <div className="col-span-2 text-center ">
      {isLoading && <Loader />}
      {usersuggestion.length > 0 && (
        <div className="flex flex-col w-full justify-center items-center box-shadow p-4">
          <h1>User Suggestions</h1>
          <div className="flex  w-full  gap-2">
            <img
              src={usersuggestion[0].avatar.url}
              alt=""
              className="w-8 rounded-full border-2 border-red-500"
            />
            <Link to={`/profile/${usersuggestion[0]._id}`}>
              <span>{usersuggestion[0].name}</span>
            </Link>
          </div>
        </div>
      )}
      <PostSuggestion />
    </div>
  );
};

export default Suggestion;
