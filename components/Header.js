import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from '../routes';
import 'semantic-ui-css/semantic.min.css';


function Header(){
    const [activeItem,setActiveItem]=useState(null);
    function handleItemClick(e,{name}){
        setActiveItem(name);
    }

    return <Menu style={{marginTop: '10px', fontSize: '20px'}}>
         <Link route="/">
            <a className='item'>CrowdCoin</a>
        </Link>
        <Menu.Menu position='right'>
            <Link route="/">
                <a className='item'>Campaigns</a>
            </Link>
            <Link route="/campaigns/new">
                <a className='item'>+</a>
            </Link>
        </Menu.Menu>
    </Menu>
};

export default Header;