import React, { useState } from "react";
import styles from "../../styles/Footer.module.css";
import { useAppContext } from "@/context/DataContext";
import { motion } from "framer-motion";

const Copyright = () => {
  const links = [
    { id: 1, text: "Privacy Policy", key: "privacyPolicyText" },
    { id: 2, text: "Terms of Service", key: "copyrightText" },
    { id: 3, text: "Cookies Settings", key: "cookiesSettingsText" }
  ];

  const { copyrightText, privacyPolicyText, cookiesSettingsText } = useAppContext();

  const texts = {
    copyrightText,
    privacyPolicyText,
    cookiesSettingsText
  };

  const [activeKey, setActiveKey] = useState(null); // No active section initially

  const handleClick = (e, key) => {
    e.preventDefault();
    setActiveKey(activeKey === key ? null : key); // Toggle active section
  };

  return (
    <>
      <div className="copyright-area">
        <div className="container">
          <div className="row align-items-center pb-5">
            <div className="col-lg-6 col-md-8 col-sm-12 col-12">
              <nav className={`${styles.linkContainer} center`}>
                <ul className="ft-menu link-hover">
                  {links.map((link) => (
                    <li key={link.id}>
                      <a
                        href="#"
                        className={`${styles.link} ${activeKey === link.key ? styles.active : ""}`}
                        tabIndex="0"
                        onClick={(e) => handleClick(e, link.key)}
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-12">
              {activeKey && (
                <motion.div
                className="inner text-center h-100"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                    color: "rgba(255, 255, 255, 0.35)",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal"
                  }}
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveKey(null)}
                    style={{
                      marginLeft: "10px",
                      cursor: "pointer",
                      background: "none",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "12px",
                      float: "right",
                    }}
                  >
                    ❌ Close
                  </button>
                  {texts[activeKey]}
                  
                </p>
              </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Copyright;
