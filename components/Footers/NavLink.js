import React from 'react';
import styles from '../../styles/Footer.module.css';

const NavLink = ({ href, children, isActive }) => {
  return (
    <a
      href={href}
      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
    >
      {children}
    </a>
  );
};

export default NavLink;