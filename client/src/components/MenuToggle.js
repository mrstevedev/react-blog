import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   mobileToggler: {
       padding: '0 2rem'
   }
}));

export default function MenuToggle(props) {
    const classes = useStyles();
    const [menuToggle, setMenuToggle] = useState(false);

    const handleToggle = () => {
        const burger = document.querySelector('.burger');
        burger.classList.toggle('active')
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('show');
    }
    return (
        <div className="mobile-toggle" className={ classes.mobileToggler }>
            <button className={ `burger ${ props.active ? ('active') : '' }` } onClick={ handleToggle }></button>            
        </div>
    )
}
