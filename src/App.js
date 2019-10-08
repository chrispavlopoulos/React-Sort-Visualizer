import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Array from './components/Array.jsx'

var timeout = 100

class App extends Component {
  state = {
    sorting: false,
    array: [2, 9, 4, 2, 1, 3, 5, 6, 8, 7],
    selectedIdxOne: -1,
    selectedIdxTwo: -1,

    timeout: 200,
  }

  constructor(props){
    super(props)

    this.arrayDOM = React.createRef()
  }

  componentDidMount(){
    
  }

  render(){
    var {sorting, array, selectedIdxOne, selectedIdxTwo} = this.state

    return (
      <div className="App">
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: '10vmin', marginRight: '10vmin'}}>
          <Array ref={this.arrayDOM} array={array} selectedIdxOne={selectedIdxOne} selectedIdxTwo={selectedIdxTwo} />
        

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2em'}}>
          <button className={sorting? "Sort-Button-Disabled": "Sort-Button"}
            style={{}}
            onClick={() => this.doSort(array)}>
            Bubble Sort
          </button>          
          
          <button className={sorting? "Sort-Button-Disabled": "Sort-Button"}
            style={{marginLeft: '5vmin'}}
            onClick={() => this.shuffle(array)}>
            Shuffle
          </button>

          <button className={sorting? "Sort-Button-Disabled": "Sort-Button"}
            style={{marginLeft: '5vmin'}}
            onClick={() => this.setState({timeout: 0})}>
            Skip
          </button>

        </div>
      </div>

      </div>
    );
  }

  shuffle = (array) =>{
    for(var i = array.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    this.setState({array: array})
  }

  doSort = () =>{
    var {array, sorting} = this.state


    if(sorting)
      return;

    this.setState({sorting: true})
    this.bubbleSort(array, 0, 1)
  }

  bubbleSort = (array, i, j, didSwap = false) =>{
    //  for(i = 0; i < n - 1; i++)
    //    for(j = i + 1; j < n; j++)

    setTimeout(() =>{
      if(i >= array.length - 1){
        if(didSwap){
          console.log("Need to bubble sort again")

          this.bubbleSort(array, 0, 0)
        }else{
          console.log("Finished!")

          this.setState({sorting: false, array: array, selectedIdxOne: -1, selectedIdxTwo: -1, timeout: 200})
        }
        
        
      }else if(j >= array.length){
        this.bubbleSort(array, i + 1, 0, didSwap)
        
      }else{
        if(array[j] > array[j + 1]){
          this.swap(array, j, j + 1)
          didSwap = true
              
        }

        if(timeout !== 0)
          this.setState({array: array, selectedIdxOne: i, selectedIdxTwo: j})

        this.bubbleSort(array, i, j + 1, didSwap)
      }

    }, this.state.timeout)

  }

  swap = (array, i, j) =>{
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp

    var arrayDOM = ReactDOM.findDOMNode(this.arrayDOM.current)
    var domChildren = arrayDOM.children[0]
    domChildren.children[i].style.marginTop = '10px'
    var wow = "wow"
  }

  updateArray = (array) =>{
    
    
  }
}

export default App;
