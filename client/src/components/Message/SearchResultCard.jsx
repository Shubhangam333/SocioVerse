import { Link } from "react-router-dom";

const SearchResultCard = ({ user }) => {
  return (
    <Link>
      <div className="flex  items-center py-2 gap-2 rounded-full bg-slate-400">
        <img src={user.avatar.url} alt="" className="w-8 rounded-full" />
        <h2 className="text-xl text-white">{user.name}</h2>
      </div>
    </Link>
  );
};

export default SearchResultCard;
