import ImageHeader from "./ImageHeader";

const ProfileHeader = ({ user }) => {
  return (
    <div className="mt-24 m-auto">
      <ImageHeader userInfo={user} />
    </div>
  );
};

export default ProfileHeader;
