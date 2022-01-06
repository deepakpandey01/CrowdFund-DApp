import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';


function Header(){
    const [activeItem,setActiveItem]=useState(null);
    function handleItemClick(e,{name}){
        setActiveItem(name);
    }

    return <Menu style={{marginTop: '10px', fontSize: '20px'}}>
         <Menu.Item >
            CrowdCoin
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item >
                Camapaigns
            </Menu.Item>
            <Menu.Item name='add' active={activeItem === 'add'} onClick={handleItemClick}>
                +
            </Menu.Item>
        </Menu.Menu>
    </Menu>
};

export default Header;