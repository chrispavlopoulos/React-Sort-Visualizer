import React, { Component } from "react";

class ListItem extends Component{

    constructor(props){
        super(props)
    }

    render() {
        
        var{number, marginLeft, left, top, color, sorting} = this.props
        return (
            <div class="Array-Number" style={{ marginRight: "2vmin",
            color: color, position: "absolute", marginLeft: marginLeft, left: left, top: top, textShadow: sorting? "2px 2px 20px rgba(255, 255, 255, 0.1)": ''}}
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