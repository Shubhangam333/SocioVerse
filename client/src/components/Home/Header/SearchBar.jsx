import { useCallback, useEffect, useState } from "react";
import { BiLoader, BiSearch } from "react-icons/bi";
import { useSearchUsersMutation } from "../../../features/profile/profileapi";
import SearchResultItem from "./SearchResultItem";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchUser, { isLoading, data, isSuccess }] = useSearchUsersMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const getUsers = useCallback(async () => {
    try {
      await searchUser(search.trim()).unwrap();
    } catch (error) {
      console.log(error);
    }
  }, [search, searchUser]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div className="relative">
      <form
        className="w-80 text-lg relative  flex justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="w-full  outline-none border-b-2 focus:border-slate-400"
          placeholder="Search...."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>
          <BiSearch className="text-lg " />
        </button>
      </form>

      <div
        className={`absolute shadow-2xl bg-white top-12 left-0 right-0 p-2 
              rounded-bl-md  rounded-br-md
               ${isSuccess && data && data.users ? "" : "hidden"}`}
      >
        {isLoading ? (
          <BiLoader />
        ) : (
          isSuccess &&
          data &&
          data.users && (
            <>
              {data.users.length > 0 ? (
                <div>
                  {data.users.map((u) => (
                    <SearchResultItem
                      key={u._id}
                      user={u}
                      setSearch={setSearch}
                    />
                  ))}
                </div>
              ) : (
                <p>No result found</p>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
