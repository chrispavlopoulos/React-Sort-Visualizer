import React, { Component } from "react";
import ListItem from './ListItem.jsx';

const itemId = "ListItem-"

class Array extends Component{

    render() {
        
        var arr = this.props.array;
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    {arr.map(number => (
                        <ListItem key={itemId + number} id={itemId + number} number={number} />
                    ))}  
                </div>
            </div>

        )
    }
}

export default Array;