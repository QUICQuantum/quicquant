import Image from "next/image";
import Link from "next/link";

import avatar from "../../public/images/team/team-01sm.jpg";
import UserMenuItems from "./HeaderProps/UserMenuItem";

const UserMenu = () => {
  return (
    <>
      <div className="inner">
        <div className="rbt-admin-profile">
          
        </div>
        <UserMenuItems parentClass="user-list-wrapper user-nav" />
        <hr className="mt--10 mb--10" />
        <ul className="user-list-wrapper user-nav">
          <li>
            <Link href="/privacy-policy">
              <i className="fa-solid fa-comments-question"></i>
              <span>Help Center</span>
            </Link>
          </li>
          <li>
            <Link href="/profile-details">
              <i className="fa-sharp fa-solid fa-gears"></i>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      
      
      </div>
    </>
  );
};

export default UserMenu;
