import React, { Component } from 'react';
import './style.css';
import Logo from 'assets/images/logo_jds.png';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



class Navbar extends Component {
    state = {
        openToggle: false
    }

    static contextType = AuthContext;

    handleToggle = () => {
        const { openToggle } = this.state;
        this.setState({ openToggle: !openToggle });
    }
    
    render() {
        console.log(window.location.href);
        const loginPathRegex = /\/login/;
        // Links bakal tergantung lagi login admin atau tidak, bakal ngikut dari route
        // Sekarang pake dummy begini dulu
        const { openToggle } = this.state;
        // Link-link sementara, bakal bertambah seiring waktu
        const links = this.context.currentUser ? [
            { title: 'Survei', path: '/admin' },
            // { title: 'Carousel', path: '/admin' },
            { title: 'Tambah Admin', path: '/admin/register' }
        ] : [
            { title: 'Beranda', path: '/' },
            { title: 'Kontak', path: '/' },
        ];
        return (
            <>  
                {
                /* {(window.location.href == `http://localhost:3000/login`) ? <div className="m-3">Navbar</div> : <div className="m-3">Hide</div>} */}
                <nav className={loginPathRegex.test(window.location.href) ? "hide" : "navbar fixed-top navbar-expand-lg navbar-light"}>
                    <div className="container container-fluid">
                        <div className="logo">
                            <Link className="navbar-brand " to={this.context.currentUser? "/admin" : "/" }>
                                <img src={Logo} alt="" width={100} />
                            </Link>
                        </div>

                        {this.context.currentUser ?
                            <>
                            <div class="dropdown">
                            <button class="btn dropdown-toggle px-3" style={{backgroundColor:"white", color:"black"}} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              Admin
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="dropdown-item py-2">Hello,<br></br><strong>{this.context.currentUser}</strong></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="text-center my-2">
                                        <a href="/admin/survey/new" className="btn "style={{backgroundColor:"var(--green)", color:"white"}}>Buat Survei Baru</a>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    {links.map(link => {
                                        return (
                                            <a href={link.path} className="dropdown-item py-2">{link.title}</a>
                                        );

                                    })}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="dropdown-item py-2" onClick={this.context.logout}>Keluar</li>
                                </ul>
                          </div>
                            {/* <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="dropdown-item"><AccountCircleIcon/>{this.context.currentUser}</li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="text-center my-2">
                                        <button type="button" className="btn "style={{backgroundColor:"var(--green)", color:"white"}}>Buat Survei Baru</button>
                                    </li>
                                    {links.map(link => {
                                        return (
                                            <a href={link.path} className="dropdown-item py-2">{link.title}</a>
                                            // <li className="dropdown-item"><Link to={link.path}>{link.title}</Link></li>
                                        );

                                    })}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li className="dropdown-item" onClick={this.context.logout}>KELUAR</li>
                                </ul>
                            </div> */}
                            </>
                            :
                            <>
                                <button className="navbar-toggler" type="button" onClick={this.handleToggle}>
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className={`collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end mobileMenu p-3 p-lg-0 mt-lg-0 ${openToggle ? "open" : ""}`} id="navbarNavAltMarkup" >

                                    <ul className="navbar-nav align-self-stretch">
                                        {links.map(link => {
                                            return (
                                                <li className="nav-item" key={link.title}>
                                                    <Link className="nav-link active" aria-current="page" to={link.path}>{link.title}</Link>
                                                </li>
                                            );

                                        })}
                                    </ul>
                                </div>
                            </>
                        }

                    </div>
                </nav>
                <div className="overlay" style={openToggle ? { display: "block" } : { display: "none" }} onClick={this.handleToggle}></div>
            </>
        );
    }
}

export default Navbar;