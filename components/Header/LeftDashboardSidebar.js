import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import avatar from "../../public/images/team/team-01sm.jpg";
import light from "../../public/images/light/switch/sun-01.svg";
import dark from "../../public/images/light/switch/vector.svg";

import SmallNavItem from "../../data/header.json";
import { useAppContext } from "@/context/Context";

const LeftSidebar = () => {
  const router = useRouter();
  const { shouldCollapseLeftbar, isLightTheme, toggleTheme } = useAppContext();

  const isActive = (href) => router.pathname === href;
  return (
    <>
      <div
        className={`rbt-left-panel popup-dashboardleft-section ${
          shouldCollapseLeftbar ? "collapsed" : ""
        }`}
      >
        <div className="rbt-default-sidebar">
          <div className="inner">
            <div className="content-item-content">
              <div className="rbt-default-sidebar-wrapper">
                <nav className="mainmenu-nav">
                  <ul className="dashboard-mainmenu rbt-default-sidebar-list">
                    {SmallNavItem &&
                      SmallNavItem.smallNavItem
                        .slice(0, 7)
                        .map((data, index) => (
                          <li key={index}>
                            <Link
                              className={
                                isActive(data.link)
                                  ? "active"
                                  : "" || data.isDisable
                                  ? "disabled"
                                  : ""
                              }
                              href={data.link}
                            >
                              <Image
                                src={data.img}
                                width={35}
                                height={35}
                                alt="AI Generator"
                              />
                              <span>{data.text}</span>
                              {data.badge !== "" ? (
                                <div className="rainbow-badge-card badge-sm ml--10">
                                  {data.badge}
                                </div>
                              ) : (
                                ""
                              )}
                            </Link>
                          </li>
                        ))}
                  </ul>
                  <div className="rbt-sm-separator"></div>
            
                </nav>
              </div>
            </div>
          </div>
          <div className="switcher-btn-gr inner-switcher">
            <button
              className={`${isLightTheme ? "active" : ""}`}
              onClick={toggleTheme}
            >
              <Image src={dark} alt="Switcher Image" />
              <span className="text">Dark</span>
            </button>
            <button
              className={`${!isLightTheme ? "active" : ""}`}
              onClick={toggleTheme}
            >
              <Image src={light} alt="Switcher Image" />
              <span className="text">Light</span>
            </button>
          </div>
          <p className="subscription-copyright copyright-text text-center b3  small-text">
            © 2025
            <Link
              className="ps-2"
              href="https://themeforest.net/user/rainbow-themes/portfolio"
            >
              Quic. All rights reserved
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
