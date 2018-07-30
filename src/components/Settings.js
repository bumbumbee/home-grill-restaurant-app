import React from 'react';

class Settings extends React.Component {

    createDish = (e) => {
        e.preventDefault(); // kad neperkrautu puslapio patvirtinus forma
        // console.log(e.target.price.value);
        // console.log(e.target.name.value);
        const dish={
            name: e.target.name.value,
            price: parseFloat(e.target.price.value)
        };
        this.props.addSpecial(dish);
        e.target.reset()
    };


    render() {
        const special=this.props.special.map((item, i)=>{
            return (
                <li key={i}>
                    {item.name}
                    <span
                        onClick={()=>this.props.removeSpecial(i)}
                        className="delete">x</span>
                    <span className="price">{item.price} $</span>
                </li>
            )
        });

        return (
            <div className="settings">
                <h3>Settings</h3>
                <div className="controls">
                    <form onSubmit={this.createDish}>
                        <input
                            name="name"
                            type="text" placeholder="Name"/>
                        <input
                            name="price"
                            type="number" placeholder="Price"/>
                        <button className="btn">Add</button>
                    </form>
                    <ul>
                        {special}
                    </ul>
                </div>

            </div>
        );
    }
}

export default Settings