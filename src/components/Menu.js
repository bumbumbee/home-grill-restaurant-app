import React from 'react';
import drinks from '../images/drinks.png'
import dishes from '../images/main_dish.png'
import desserts from '../images/cake.png'
import special from '../images/special.png'

const Menu = (props)=>{
    const images=[drinks, dishes, desserts, special];
    // mapinam per array ir grazinam kategorija
    const categories= props.categories.map((cat, i)=>{
        return (
            <div
                className={cat===props.active? "category active-cat" : "category"}
                onClick={()=>props.switchCat(cat)}
                 key={cat}>
                <img src={images[i]} alt=""/>
                <h3>{cat}</h3>
            </div>
        )
    });
    let items;
     if (props.items){
         items = props.items.map((item,i)=>{
             return (
                 <li
                     onClick={()=>{props.addOrder(item)}}
                     key={i}>{item.name}
                     <span>{item.price} $</span>
                 </li>
             )
         });
     }

    return (
        <div className="menu">
            <div className="categories">
                {categories}
            </div>
            <ul className="menu-items">
                {items}
            </ul>
            { // loaderis
                props.items? null : <div className="loader"/>}
        </div>
    );
};
export default Menu