import { userImage } from "@styles/community/tailwindStyle";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UserProfile = ({ imageSrc, nickname }) => {
  return (
    <>
      {imageSrc ? (
        <img className="inline-block w-50" src={imageSrc} alt="profile" />
      ) : (
        <UserCircleIcon className={userImage} />
      )}
      <span className="nickname pl-2">{nickname}</span>
    </>
  );
};

export default UserProfile;
