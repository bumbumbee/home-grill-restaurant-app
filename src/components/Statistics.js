import React from 'react';

const Statistics = (props)=>{
    const total=props.completed.reduce((total, order)=>{
        return total+order.price
    }, 0);  // jei array su obj [{}, {},{}], 0 butinas (pradine reiksme)

    return (
        <div className="stats">
            <h3>Statistics</h3>
            <h3>Day total: {total.toFixed(2)} $</h3>

        </div>
    );
};
export default Statistics