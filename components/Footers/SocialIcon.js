import React from 'react';
import styles from '../../styles/Footer.module.css';

const SocialIcon = ({ src, alt, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className={styles.socialIcon}
      />
    </a>
  );
};

export default SocialIcon;
