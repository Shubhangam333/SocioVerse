import { useState } from "react";
import { useUserSuggestionQuery } from "../../../features/profile/profileapi";
import Loader from "../../Loader/Loader";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Suggestion = () => {
  const { data, isLoading, isSuccess, error } = useUserSuggestionQuery();
  console.log(data);
  const [usersuggestion, setUserSuggestion] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setUserSuggestion(data.users);
    }
  }, [data, isSuccess]);
  return (
    <div className="col-span-2">
      <h1>User Suggestions</h1>
      {isLoading && <Loader />}
      {usersuggestion.length > 0 && (
        <div className="flex flex-col items-center">
          <div className="flex justify-between">
            <img
              src={usersuggestion[0].avatar.url}
              alt=""
              className="w-8 rounded-full"
            />
            <Link to={`/profile/${usersuggestion[0]._id}`}>
              <span>{usersuggestion[0].name}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestion;
