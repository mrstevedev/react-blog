import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MenuToggle from './MenuToggle';

const useStyles = makeStyles((theme) => ({
    menuList: {
        margin: '1.6rem 0',
        '& li': {
            padding: '1.3rem 2rem'
        }
    },
    linkText: {
        color: "#333",
        fontWeight: '400',
        fontSize: '1rem'
      },
}));

function SidebarRight(props) {
    const classes = useStyles();

    return (
        <Grid className="mobile-menu">
            <MenuToggle active="active" />
            <Paper elevation={0} square={true}>
                <MenuList className={ classes.menuList }>
                    <MenuItem><Link to="/addpost" className={ classes.linkText }><i className="fas fa-plus-square"></i> Add Post</Link></MenuItem>
                    <MenuItem><Link to="/profile" className={ classes.linkText }><i className="fas fa-address-card"></i> Profile</Link></MenuItem>
                    <MenuItem><Link to="/account" className={ classes.linkText }><i className="fas fa-user-circle"></i>     Account</Link></MenuItem>
                    <MenuItem><Link to="/signin" className={ classes.linkText }><i className="fas fa-sign-in-alt"></i> Sign In</Link></MenuItem>
                </MenuList>
            </Paper>
        </Grid>
    )
}

export default SidebarRight
