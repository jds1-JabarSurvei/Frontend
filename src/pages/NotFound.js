import React from 'react';
import Button from '@material-ui/core/Button';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
const NotFound = () => {
    return (
        <div className="center-page" style={{ textAlign:"center"}}>
            <h1>Halaman Tidak Ditemukan.</h1>
            <a href="/" className="btn "style={{backgroundColor:"var(--green)", color:"white"}}><HomeRoundedIcon/> Kembali Ke Beranda</a>
        </div>
    );
}

export default NotFound;