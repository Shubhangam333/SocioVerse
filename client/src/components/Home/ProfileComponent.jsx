import Gallery from "./Profile/Gallery/Gallery";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileInfo from "./Profile/ProfileInfo";

const ProfileComponent = () => {
  return (
    <div className="main m-auto">
      <ProfileHeader />
      <ProfileInfo />
      <Gallery />
    </div>
  );
};

export default ProfileComponent;
