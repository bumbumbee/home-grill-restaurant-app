import React from 'react';

const Header = ({tabs, active, switchTab}) => { // objektu destrukturizavimas

    //const tabs=props.tabs.map((tab, i));
    const navigation = tabs.map((tab) => {
        return (
            <li
                onClick={()=>{switchTab(tab)}}
                className={active === tab ? "active" : null}
                key={tab}>{tab}
            </li>
        )
    });


    return (
        <header>
            <h2>Menu</h2>
            <nav>
                <h1>Home <span>Grill</span></h1>
                <ul>
                    {navigation}
                </ul>
            </nav>
        </header>
    );
};
export default Header