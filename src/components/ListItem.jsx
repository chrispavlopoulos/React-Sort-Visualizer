import React, { Component } from "react";


class ListItem extends Component{

    constructor(props){
        super(props)
        this.root = React.createRef()
    }

    render() {
        
        var{number, left, top, color} = this.props
        return (
            <div ref={this.root} style={{ marginRight: "2vmin", marginLeft: "2vmin", fontSize: "6vmin",
            color: color}}
            onClick={() => {console.log("wow " +number)}}>
                {number}
            </div>

        )
    }

    highlight(){
        var root = this.root.current
        var wow = "wow"
    }
}

export default ListItem;