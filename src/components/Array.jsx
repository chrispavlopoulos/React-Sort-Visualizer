import React, { Component } from "react";
import ListItem from './ListItem.jsx';
import { vw, vh } from '../utils/viewport-helper.jsx'

const itemId = "ListItem-"

class Array extends Component{

    state = {
        
    }

    constructor(props){
        super(props)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
      }
    
      resize = () =>{
        if(this.state.vWidth !== window.innerWidth || this.state.height !== window.innerHeight){
          this.setState({vWidth: window.innerWidth, vHeight: window.innerHeight,});
          this.forceUpdate();
        }
      }

    render() {
        
        var {array, selectedIdxOne, selectedIdxTwo, selectedIdxThree} = this.props;
        var length = array.length
        var marginLeft = vw(50) - (Math.max(25, vw(4)) * length / 2 - vw(1))
        return (
            <div>
                <div style={{cursor: "context-menu"}}>
                {/*style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>*/}
                    {array.map((number, i) => 
                        this.renderItem(number, marginLeft, i, 
                            i === selectedIdxOne? "darkcyan":
                            i === selectedIdxTwo? "red":
                            i === selectedIdxThree? "yellow":  "white")
                    )}
                </div>
            </div>

        )
    }

    renderItem = (number, marginLeft, i, color) =>{
        var {swapI, swapJ, sorting} = this.props;

        var left = Math.max(25, vw(4)) * i
        var top = vh(20)
        if(swapI == i || swapJ == i){
            top -= vh(5)
        }

        var listItem = <ListItem key={itemId + i} id={itemId + i} number={number} 
        marginLeft={marginLeft} left={left} top={top} color={color} sorting={sorting}/>
        

        return listItem
    }


}

export default Array;