import React from 'react';
import Table from './Table'

const Order = (props)=>{

    const tables=props.tables.map((table, i)=>{
       return (
           <Table
               removeOrder={props.removeOrder}
               checkout={props.checkout}
               orders={props.orders}
               switch={props.switchTable}
               active={props.activeTable}
               name={table}
               key={i}/>
       )
    });
    return (
        <div className="orders">
            {tables}
        </div>
    );
};
export default Order