import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default function DrawerNav({ links, context }) {
    const [toggle, setToggle] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setToggle(open);
    }

    return(
        <div className="drawer">
            <React.Fragment key="right">
                <Button variant="outlined" onClick={toggleDrawer(!toggle)} disableElevation> <MenuRoundedIcon/> </Button>
                <Drawer className="drawer-container" anchor="right" open={toggle} onClose={toggleDrawer(false)}>
                    {/* <Toolbar /> */}
                    <span className="py-2" style={{padding:"0 30px", marginTop:"65px"}}>Halo,<br></br><strong>{context.currentUser}</strong></span>
                    <Divider />
                    <List>
                        <li className="text-center my-2">
                            <a href="/admin/survey/new" className="btn "style={{width:"70%", backgroundColor:"var(--green)", color:"white"}}><AddBoxIcon/> Buat Survei Baru</a>
                        </li>
                    </List>
                    <Divider />
                    <List style={{width:"25vw"}}>
                        {links.map(link => {
                                        return (
                                            <a style={{padding:"0 30px"}} href={link.path} className="dropdown-item py-2">{link.title}</a>
                                        );
                                    })}
                    </List>
                    <Divider />
                    <List>
                        <li style={{padding:"0 30px"}} className="dropdown-item py-2" onClick={context.logout}>Keluar</li>

                    </List>
                </Drawer>
            </React.Fragment>
        </div>
    )
}