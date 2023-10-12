import { useProfileQuery } from "../../features/profile/profileapi";

const ProfileComponent = () => {
  const { data, isLoading, error } = useProfileQuery();

  console.log("isLoading", isLoading);

  console.log(error, data);

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <div>ProfileComponent data here</div>}
    </div>
  );
};

export default ProfileComponent;
