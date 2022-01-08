import React, { useState } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import {Link} from '../routes';
import 'semantic-ui-css/semantic.min.css';


function Header(){
    const [activeItem,setActiveItem]=useState(null);
    function handleItemClick(e,{name}){
        setActiveItem(name);
    }

    return <Menu style={{fontSize: '20px'}}>
         <Link route="/">
            <a className='item' ><h3>CrowdCoin</h3></a>
        </Link>
        <Menu.Menu position='right'>
            <Link route="/">
                <a className='item' ><h3>Campaigns</h3></a>
            </Link>
            <Link route="/campaigns/new">
                <a className='item'><h2>+</h2></a>
            </Link>
        </Menu.Menu>
    </Menu>
};

export default Header;