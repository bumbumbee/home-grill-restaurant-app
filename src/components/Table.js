import React from 'react';

const Table = (props)=>{
    let total=0;
    const orders=props.orders.filter(order=>order.table===props.name)
        .map((order, i)=>{
            total+=order.price;
            return (
                <li className="item" key={i}>
                    {order.name}
                    <span className="delete"
                    onClick={()=>props.removeOrder(order.id)}
                    >x</span>
                    <span className="price">{order.price.toFixed(2)}</span>
                </li>
            )
        });




    return (
        <div
            onClick={()=>props.switch(props.name)}
            className={props.active===props.name? "table active-table" : "table"}>
            <h4>{props.name}</h4>
            <ul>
                {orders}
            </ul>
            <nav>
                <div className="btn" onClick={()=>props.checkout(props.name)}>
                    Checkout</div>
                <h5>Total: {total.toFixed(2)} $</h5>
            </nav>
        </div>
    );
};
export default Table