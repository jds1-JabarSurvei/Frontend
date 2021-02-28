import React, { Component } from 'react';
import './style.css';
import Logo from 'assets/images/logo_jds.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {
        admin: true,
        openToggle: false
    }

    handleToggle = () => {
        const { openToggle } = this.state;
        this.setState({ openToggle : !openToggle });
    }

    render() {
        // Links bakal tergantung lagi login admin atau tidak, bakal ngikut dari route
        // Sekarang pake dummy begini dulu
        const { admin, openToggle } = this.state;

        // Link-link sementara, bakal bertambah seiring waktu
        const links = admin ? [
            { title: 'LOGIN', path: '/' }
        ] : [
                { title: 'Home', path: '/' },
                { title: 'Data', path: '/' },
                { title: 'Kontak', path: '/' }
            ];
        return (
            <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light">
                <div className="container container-fluid">
                        <div className="logo">
                            <Link className="navbar-brand " to="/">
                                <img src={Logo} alt="" width={100} />
                            </Link>
                        </div>
    
                        <button className="navbar-toggler" type="button" onClick={this.handleToggle}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={`collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end mobileMenu p-3 p-lg-0 mt-lg-0 ${openToggle ? "open" : ""}`} id="navbarNavAltMarkup" >
                            <ul className="navbar-nav align-self-stretch">
                                {links.map(link => {
                                    return(
                                        <li className="nav-item" key={link.title}>
                                            <Link className="nav-link active" aria-current="page" to={link.path}>{link.title}</Link>
                                        </li>
                                    );
                                    
                                })}
                            </ul>
                        </div>
                </div>
            </nav>
            <div className="overlay" style={ openToggle ? {display : "block"} : {display : "none"}} onClick={this.handleToggle}></div>
            </>
        );
    }
}    

export default Navbar;