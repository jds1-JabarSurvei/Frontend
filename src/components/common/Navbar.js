import React from 'react';
import './style.css';
import useWindowSize from 'hooks/useWindowSize';
import Logo from 'assets/images/logo_jds.png';

const Navbar = () => {
    const size = useWindowSize();

    // Links bakal tergantung lagi login admin atau tidak, bakal ngikut dari route
    // Sekarang pake dummy begini dulu
    const admin = true;
    // Link-link sementara, bakal bertambah seiring waktu
    const links = admin ? [
        'Surveys',
    ] : [
            'Home',
            'Data',
            'Kontak'
    ];
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <div className="logo">
                    <a class="navbar-brand" href="#">
                        <img src={Logo} alt="" width={80} />
                    </a>
                </div>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class={`collapse navbar-collapse ${size.width < 992 ? "" : "nav-align-right"}`} id="navbarNav">
                    <ul class="navbar-nav">
                        {links.map(link => {
                            return (
                                <li class="nav-item" key={link}>
                                    <a class="nav-link active" aria-current="page" href="#">{link}</a>
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