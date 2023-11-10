import { useCallback, useEffect, useState } from "react";
import { BiLoader, BiSearch } from "react-icons/bi";
import { useSearchUsersMutation } from "../../features/profile/profileapi";
import SearchResultCard from "./SearchResultCard";

import "./search.css";

const SearchBox = ({ handleModal }) => {
  const [search, setSearch] = useState("");
  const [searchUser, { isLoading, data }] = useSearchUsersMutation();

  const [users, setUsers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className=" modal-overlay z-50 transform transition-transform duration-300 ease-out hover:scale-110">
      <div className="fixed  w-1/4 search-modal z-40 ">
        <div className="flex ">
          <form
            className="w-full text-lg relative m-auto bg-red-400 "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="w-full border-2 border-slate-400 px-4 outline-none"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute top-2 w-8 right-0 border-l-2 border-slate-500">
              <BiSearch className="text-xl" />
            </button>
          </form>
          <button
            className="rounded-md bg-red-500 text-white px-2"
            onClick={handleModal}
          >
            Close
          </button>
        </div>
        {isLoading ? (
          <BiLoader />
        ) : (
          users.length > 0 && (
            <div className="results absolute top-12 left-0 right-0  w-full h-full z-20 flex flex-col gap-2">
              {users.map((u) => (
                <SearchResultCard key={u._id} user={u} />
              ))}
            </div>
          )
        )}
        {}
      </div>
    </div>
  );
};

export default SearchBox;
