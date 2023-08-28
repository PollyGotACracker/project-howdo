import { userImage } from "@styles/community/tailwindStyle";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UserProfile = ({ imageSrc, nickname }) => {
  return (
    <span className="flex items-center">
      {imageSrc ? (
        <img className="rounded-full w-10 h-10" src={imageSrc} alt="profile" />
      ) : (
        <UserCircleIcon className={userImage} />
      )}
      <span className="nickname pl-2 ">{nickname}</span>
    </span>
  );
};

export default UserProfile;
