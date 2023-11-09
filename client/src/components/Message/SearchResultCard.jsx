import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateConversations } from "../../features/messages/messageSlice";

const SearchResultCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleClick = (user) => {
    dispatch(updateConversations(user));
  };

  return (
    <Link>
      <div className="flex justify-between items-center py-2 gap-2 rounded-md bg-slate-400">
        <div className="flex items-center">
          <img src={user.avatar.url} alt="" className="w-8 rounded-full" />
          <h2 className="text-xl text-white">{user.name}</h2>
        </div>
        <button
          onClick={() => handleClick(user)}
          className="bg-green-600 text-white px-2 mx-2"
        >
          Add User
        </button>
      </div>
    </Link>
  );
};

export default SearchResultCard;
