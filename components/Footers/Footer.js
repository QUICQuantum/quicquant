import React from 'react';
import styles from '../../styles/Footer.module.css';
import NavLink from './NavLink';
import SocialIcon from './SocialIcon';
import logo from "../../public/images/logo/Union.svg";
import Image from "next/image";
import Link from "next/link";
const navItems = [
  { href: '/about', text: 'About us' },
  { href: '/services', text: 'Services' },
  { href: '/contact', text: 'Contact' },
  { href: '/blogs', text: 'Blogs' },
  { href: '/ai', text: 'AI' },
  { href: '/careers', text: 'Careers' }
];

const socialIcons = [
    { src: '/images/brand/twitter.png', alt: 'Twitter', link: 'https://twitter.com' },
    { src: '/images/brand/tg.svg', alt: 'Telegram', link: 'https://telegram.org' }
  ];
  
  

const Footer = () => {
  return (
    <>
   <footer className="rainbow-footer footer-style-default footer-style-3 position-relative">
    <div className="container margincenter">
        <div className="row justify-content-between footer-mob-container">
            {/* Logo */}
            <div className="col-lg-2 col-md-3 col-6 footer-logo-mob">
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

            {/* Social Icons */}
            <div className={`col-lg-2 ${styles.socialLinks} footer-social-mob`}>
                {socialIcons.map((icon, index) => (
                    <SocialIcon key={index} src={icon.src} alt={icon.alt} link={icon.link} />
                ))}
            </div>
        </div>
    </div>
</footer>

    </>
  );
};

export default Footer;
