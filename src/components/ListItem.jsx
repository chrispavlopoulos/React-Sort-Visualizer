import React, { Component } from "react";


class ListItem extends Component{

    render() {
        
        var number = this.props.number;
        return (
            <div style={{marginRight: "2vmin", marginLeft: "2vmin", fontSize: "8vmin"}} onClick={() => {console.log("wow")}}>
                {number}
            </div>

        )
    }
}

export default ListItem;