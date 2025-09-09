import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/Context";

import logo from "../../public/images/logo/Union.svg";
import logoDark from "../../public/images/light/logo/logo-dark.png";
import avatar from "../../public/images/team/team-01sm.jpg";

import Nav from "./Nav";
import UserMenu from "./UserMenu";

const HeaderDashboard = ({ display }) => {
  const {
    mobile,
    setMobile,
    rightBar,
    setRightBar,
    activeMobileMenu,
    setActiveMobileMenu,
    isLightTheme,
  } = useAppContext();
  return (
    <>
      <header className="rbt-dashboard-header rainbow-header header-default header-left-align rbt-fluid-header" style={{backgroundColor: "#010619"}}>
        <div className="container-fluid position-relative">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-3 col-md-6 col-6">
              <div className="header-left d-flex">
                <div className="expand-btn-grp">
                  <button
                    className={`bg-solid-primary popup-dashboardleft-btn ${
                      mobile ? "" : "collapsed"
                    }`}
                    onClick={() => setMobile(!mobile)}
                  >
                    <i className="fa-sharp fa-regular fa-sidebar"></i>
                  </button>
                </div>
                <div className="logo">
                <Link href="/">
                    <Image
                      className="logo-light"
                      src={logo}
                      width={135}
                      height={35}
                      alt="ChatBot Logo"
                    />
                </Link>
              </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-6">
              <div className="header-right">
                <div className="mobile-menu-bar mr--10 ml--10 d-block d-lg-none">
                  <div className="hamberger">
                    <button
                      className="hamberger-button"
                      onClick={() => setActiveMobileMenu(!activeMobileMenu)}
                    >
                      <i className="feather-menu"></i>
                    </button>
                  </div>
                </div>

                <div className="rbt-admin-panel account-access rbt-user-wrapper right-align-dropdown" >
                  <div className="rbt-admin-card grid-style" >
                    <a className="d-flex align-items-center" href="#">
                      <div className="inner d-flex align-items-center">
                        
                      </div>
                      <div className="icon">
                        <i className="fa-sharp fa-solid fa-chevron-down"  style={{ marginRight: '30px' }}></i>
                      </div>
                    </a>
                  </div>
                  <div className="rbt-user-menu-list-wrapper">
                    <UserMenu />
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderDashboard;
