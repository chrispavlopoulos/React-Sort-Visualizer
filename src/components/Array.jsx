import React, { Component } from "react";
import ListItem from './ListItem.jsx';

const itemId = "ListItem-"

class Array extends Component{

    state = {
        listItems: [],
    }

    constructor(props){
        super(props)
    }

    render() {
        
        var {array, selectedIdxOne, selectedIdxTwo} = this.props;
        var listItems = []
        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    {array.map((number, i) => 
                        this.renderItem(listItems, number, i, i === selectedIdxOne? "darkcyan": i === selectedIdxTwo? "red": "white")
                    )}
                </div>
            </div>

        )
    }

    renderItem = (listItems, number, i, color) =>{
        var left = 20 * i;
        var listItem = <ListItem key={itemId + i} id={itemId + i} number={number} left={left} color={color}/>
        listItems.push(listItem)

        if(i === this.props.array.length - 1 && listItems.length !== this.state.listItems.length){
            this.state.listItems = listItems
        }

        return listItem
    }

    getItem = (i) =>{
        return this.state.listItems[i]
    }
}

export default Array;