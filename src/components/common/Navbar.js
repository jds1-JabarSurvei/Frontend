import React from 'react';
import './style.css';
import useWindowSize from 'hooks/useWindowSize';
import Logo from 'assets/images/logo_jds.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const size = useWindowSize();

    // Links bakal tergantung lagi login admin atau tidak, bakal ngikut dari route
    // Sekarang pake dummy begini dulu
    const admin = true;
    // Link-link sementara, bakal bertambah seiring waktu
    const links = admin ? [
        { title: 'Surveys', path: '/' }
    ] : [
            { title: 'Home', path: '/' },
            { title: 'Data', path: '/' },
            { title: 'Kontak', path: '/' }
        ];
    return (
        <nav class="navbar fixed-top navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div className="logo">
                    <Link class="navbar-brand" to="/">
                        <img src={Logo} alt="" width={60} />
                    </Link>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`collapse navbar-collapse ${size.width < 992 ? "" : "nav-align-right"}`} id="navbarNav">
                    <ul class="navbar-nav">
                        {links.map(link => {
                            return (
                                <li class="nav-item" key={link.title}>
                                    <Link class="nav-link active" aria-current="page" to={link.path}>{link.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;