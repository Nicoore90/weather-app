import { useState } from 'react';
import './header.css';
import image from './assets/icons8-menu.svg';

export function Header(props) {

    const [open, setOpen] = useState(false);


    return(
    <nav>
        <ul className='navbar'>
            <li className='navbar__option'><a href='#'>Opcion 1</a></li>
            <li className='navbar__option'><a href='#'>Option 2</a></li>
            <li className='navbar__option'><a href='#'>Option 3</a></li>
        </ul>
        <div className='navbar__responsive'>
            <img  className="navbar__responsive__menu" src={image} onClick={() => setOpen(!open)}/>
            { open && props.children }
        </div>
    </nav>
    )
}

export function Dropdown() {
    return(
        <ul className='dropdown'>
            <li className='navbar__option'><a href='#'>Option 1</a></li>
            <li className='navbar__option'><a href='#'>Option 2</a></li>
            <li className='navbar__option'><a href='#'>Option 3</a></li>
        </ul>
    )
}