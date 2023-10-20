import { useSelector } from "react-redux";
import Gallery from "./Profile/Gallery/Gallery";
import ProfileHeader from "./Profile/ProfileHeader";
import ProfileInfo from "./Profile/ProfileInfo";

const ProfileComponent = ({ user }) => {
  return (
    <div className="main m-auto">
      <ProfileHeader user={user} />
      <ProfileInfo user={user} />
      <Gallery user={user} />
    </div>
  );
};

export default ProfileComponent;
