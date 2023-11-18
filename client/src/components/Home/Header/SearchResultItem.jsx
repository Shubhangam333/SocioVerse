const SearchResultItem = ({ user }) => {
  return (
    <div className="my-2 py-2 px-2 flex items-center gap-4 border-2 border-slate-400">
      <img
        src={user.avatar.url}
        alt="avatar"
        className="w-8 h-8 rounded-full border-2 border-red-500"
      />
      <h2>{user.name}</h2>
    </div>
  );
};

export default SearchResultItem;
