import React from 'react';
import './style.css';
import Logo from 'assets/images/logo_jds.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faYoutubeSquare,
    faInstagramSquare,
    faFacebookSquare,
    faTwitterSquare,
    faLinkedin,
    faMedium
} from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    // Links bakal tergantung lagi login admin atau tidak, bakal ngikut dari route
    // Sekarang pake dummy begini dulu
    const admin = false;
    // Link-link sementara, bakal bertambah seiring waktu
    const links = admin ? [
        'Surveys',
    ] : [
            'Home',
            'Data',
            'Kontak'
        ];

    return (
        <>
            <div className="footer">
                <div className="footer-general">
                    <div className="logo">
                        <a href="#">
                            <img src={Logo} alt="" width={120} />
                        </a>
                    </div>
                    <p className="footer-address">
                        Jabar Command Center <br />
                        (Gedung Setda B Lt. II)<br />
                        Jalan Diponegoro Nomor 22 <br /> Bandung Jawa Barat 40115<br />
                    </p>
                    <p className="footer-email">
                        digital.service@jabarprov.go.id
                    </p>

                </div>
                <div className="footer-links">
                    <span className="footer-header">
                        Tautan
                </span>
                    <div>
                        {links.map(link => {
                            return (
                                <a href="#" key={link}>{link}</a>
                            );
                        })}
                    </div>

                </div>
                <div className="footer-socials">
                    <span className="footer-header">
                        Ikuti Kami
                </span>
                    <div className="footer-socials-icons">
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#A82400"
                                icon={faYoutubeSquare}
                            />
                        </a>
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#EA2C59"
                                icon={faInstagramSquare}
                            />
                        </a>
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#3B5998"
                                icon={faFacebookSquare}
                            />
                        </a>
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#1DA1F2"
                                icon={faTwitterSquare}
                            />
                        </a>
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#007BB6"
                                icon={faLinkedin}
                            />
                        </a>
                        <a className="social-icon">
                            <FontAwesomeIcon
                                color="#000000"
                                icon={faMedium}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="copyright">
                Jabar Digital Service © 2021
            </div>
        </>
    );
}

export default Footer;