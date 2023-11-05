import { useCallback, useEffect, useState } from "react";
import { BiLoader, BiSearch } from "react-icons/bi";
import { useSearchUsersMutation } from "../../features/profile/profileapi";
import SearchResultCard from "./SearchResultCard";
import { useDispatch } from "react-redux";
import { updateConversations } from "../../features/messages/messageSlice";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [searchUser, { isLoading, data }] = useSearchUsersMutation();

  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const getUsers = useCallback(async () => {
    try {
      if (search.length != 0) {
        const res = await searchUser(search.trim()).unwrap();

        setUsers(res.users);
      } else if (search == "") {
        setUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [search, searchUser]);

  const handleClick = (u) => {
    dispatch(updateConversations(u));
  };

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="relative w-full mb-4">
      <form className="w-full text-lg relative m-auto">
        <input
          type="text"
          className="w-full border-2 border-slate-400 px-4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="absolute top-2 right-0 border-l-2 border-slate-500">
          <BiSearch className="text-xl" />
        </button>
      </form>
      {isLoading ? (
        <BiLoader />
      ) : (
        users.length > 0 && (
          <div className="results border-2 border-slate-200 absolute top-12 left-0 right-0 bg-white w-full h-full z-20 flex flex-col gap-2">
            {users.map((u) => (
              <SearchResultCard
                key={u._id}
                user={u}
                onClick={() => handleClick(u)}
              />
            ))}
          </div>
        )
      )}
      {}
    </div>
  );
};

export default SearchBox;
