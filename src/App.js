import React from 'react';
import Header from './components/Header'
import Menu from './components/Menu'
import Order from './components/Order'
import Settings from './components/Settings'
import Statistics from './components/Statistics'
import axios from 'axios';
import _ from 'lodash';


class App extends React.Component {

    state = {
        tabs: ['Orders', 'Statistics', 'Settings'],
        activeTab: 'Orders',
        categories: ['drinks', 'dishes', 'deserts', 'special'],
        activeCat: 'drinks',
        tables: ['table 1', 'table 2', 'table 3', 'table 4'],
        activeTable: 'table 1',
        menu: {},
        orders: [],
        completed: []
    };

    removeSpecial=(index)=>{
        console.log(index);
        const newSpecial=this.state.menu.special.filter((item, i)=>{
            return i!==index
        });
        const newMenu={...this.state.menu, special:newSpecial};
        this.setState({menu:newMenu})
    };

    addSpecial=(dish)=>{
        if(!this.state.menu.special) return;
        console.log(dish);
        const newMenu = {
            ...this.state.menu,
            special: [...this.state.menu.special, dish]
        };
        // jei reiketu irasyti i LS:
       // localStorage.setItem('special', JSON.stringify(newMenu.special))
        this.setState({menu:newMenu})
    };

    checkout = (table) => {
        const paid = [];

        // isfiltruoti orders masyva ir pakeisti state (filtruojant grazins viska, kas nelygu perduotam stalui)
        const filtered = this.state.orders.filter(order => {
            if (order.table !== table) {
                return order
            } else {
                paid.push(order);
            }
            return order.table !== table
        });
        this.setState({orders: filtered, completed: [...this.state.completed, ...paid]})
    };


    addOrder = (order) => {
        console.log(order);
        const newOrder = {
            ...order,
            table: this.state.activeTable,
            id: _.uniqueId()
        };
        this.setState({orders: [...this.state.orders, newOrder]})
    };

    removeOrder = (id) => {
        console.log(id);
        // filtruoti ir mapinti
        const filtered=this.state.orders.filter((order)=>{
            return order.id!==id
        });
        this.setState({orders:filtered})
    };

    componentDidMount = async () => {
        const url = 'https://enigmatic-cliffs-25405.herokuapp.com/menu';

        // axios.get(url).then((response)=>{
        //     console.log(response);
        // }).catch((err)=>{
        //     console.log(err);
        // })

        const response = await axios.get(url);
        console.log(response.data.menu);
        // update state
        this.setState({menu: response.data.menu})

    };


    switchTab = (activeTab) => {
        this.setState({activeTab})
    };

    switchCat = activeCat => this.setState({activeCat});

    switchTable = (activeTable) => {
        this.setState({activeTable})
    };


    render() {

        const renderContent = () => {
            switch (this.state.activeTab) {
                case this.state.tabs[0] :
                    return (
                        <Order
                            removeOrder={this.removeOrder}
                            checkout={this.checkout}
                            orders={this.state.orders}
                            switchTable={this.switchTable}
                            activeTable={this.state.activeTable}
                            tables={this.state.tables}/>
                    );
                case this.state.tabs[1] :
                    return <Statistics
                        completed={this.state.completed} />;
                case this.state.tabs[2] :
                    return (
                        <Settings
                            removeSpecial={this.removeSpecial}
                            special={this.state.menu.special}
                            addSpecial={this.addSpecial}
                        />
                    );
                default :
                    return null
            }
        };

        return (
            <div>
                <Header
                    switchTab={this.switchTab}
                    active={this.state.activeTab}
                    tabs={this.state.tabs}
                />
                {renderContent()}
                <Menu
                    addOrder={this.addOrder}
                    items={this.state.menu[this.state.activeCat]}
                    switchCat={this.switchCat}
                    active={this.state.activeCat}
                    categories={this.state.categories}
                />
            </div>
        );
    }
}

export default App;
