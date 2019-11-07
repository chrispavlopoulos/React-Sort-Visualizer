import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Array from './components/Array.jsx'

const defaultTimeout = 200
const SORT_SELECTION = 'selection'
const SORT_BUBBLE = 'bubble'

class App extends Component {
  state = {
    algorithm: SORT_SELECTION,
    sorting: false,
    array: [2, 9, 4, 2, 1, 3, 5, 6, 8, 7],
    selectedIdxOne: -1,
    selectedIdxTwo: -1,
    selectedIdxThree: -1,
    swapI: -1,
    swapJ: -1,

    timeout: defaultTimeout,
  }

  constructor(props){
    super(props)

    this.arrayDOM = React.createRef()
    this.inputArray = React.createRef()
    this.inputSelector = React.createRef();
  }

  componentDidMount(){
    document.title = "Sort Visualizer"

  }

  render(){
    var {sorting, array, selectedIdxOne, selectedIdxTwo, selectedIdxThree, swapI, swapJ} = this.state

    return (
      <div className="App">
        <div style={{height: '100vh' }} >
        {/*display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>*/}
          <Array ref={this.arrayDOM} 
          sorting={sorting} array={array} 
          selectedIdxOne={selectedIdxOne} selectedIdxTwo={selectedIdxTwo} selectedIdxThree={selectedIdxThree}
          swapI={swapI} swapJ={swapJ} />
        {/*
        <div style={{position: "absolute", alignItems: "center", textAlign: "center", justifyContent: 'center', backgroundColor: "red"}}>
          Press a button to start sorting!
        </div>*/}

        <div style={{position: "absolute", bottom: "33vh", width: "100vw",
         display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "center"}}>
          <input ref={this.inputArray} style={{fontSize: "1.2em", height: "1.5em", paddingLeft: '0.25em', paddingRight: '0.25em', border: 'none', borderRadius: '4px'}}/>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
            <p>Enter a list you'd like to sort</p>
            <div style={{width: '1em', height: '1em', marginLeft: '1em', backgroundColor: 'white', boxShadow: '1px 1px 5px black'}}
            onClick={() => this.setArray(this.inputArray.current.value)}/>
          </div>
        </div>

        <div style={{position: "absolute", bottom: "20vh",}}>
          <div style={{width: "100vw", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>        
            
            <button id="Button-Shuffle" className={sorting? "Sort-Button-Disabled": "Sort-Button"}
              onClick={() => this.shuffle(array)}>
              Shuffle
            </button>

            <button id="Button-Sort" className={sorting? "Sort-Button-Disabled": "Sort-Button"}
              style={{marginLeft: '5vmin'}}
              onClick={() => this.doSort(array)}>
              Sort!
            </button>  

            <button id="Button-Skip" className={"Sort-Button"}
              style={{marginLeft: '5vmin'}}
              onClick={() => sorting && this.setState({timeout: 0})}>
              Skip
            </button>

          </div>
        </div>

        <div style={{position: "absolute", bottom: "10vh", width: "100vw", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: "center"}}>
          <select ref={this.inputSelector} id="sorting-algorithm" name="sorting-algorithm" style={{width: '10em', borderRadius: '4px'}}
          onClick={() => this.setState({algorithm: this.inputSelector.current.value})}>
            <option value={SORT_SELECTION}>Selection Sort</option>
            <option value={SORT_BUBBLE}>Bubble Sort</option>
            <option value="Merge">Merge Sort</option>
          </select>
        </div>


      </div>

      </div>
    );
  }

  setArray = (newArray) =>{
    if(this.state.sorting)
      return

    var newArray = (""+newArray).replace(/\D/g,'').split("")
    this.setState({array: newArray})
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
    var {algorithm, array, sorting} = this.state
    var newArray = this.inputArray.current.value
    console.log(newArray)


    if(sorting)
      return;

    this.setState({sorting: true})
    
    if(algorithm === SORT_BUBBLE)
      this.bubbleSort(array, 0, 1)
    else if(algorithm === SORT_SELECTION)
      this.selectionSort(array, 0)
  }

  selectionSort = (array, left, i = 1, minI = -1) =>{
    //  1. Find min
    //  2. Swap 'left' index with 'minI'
    //  3. 'left'++

    if(minI === -1)
      minI = left
      
    setTimeout(() =>{
      if(left >= array.length - 1){
        console.log("Finished sorting!")
        
        this.reset(array)

      } else if(i >= array.length){
        console.log("Reached the end of the array, time to swap")

        if(array[left] > array[minI])
          this.swap(array, left, minI)

        this.selectionSort(array, left + 1, left + 2)
      } else{
      
        if(array[i] < array[minI])
          minI = i

          
        if(this.state.timeout != 0){
          this.setState({array: array, selectedIdxOne: left, selectedIdxTwo: i, selectedIdxThree: minI})
        }else if(this.state.selectedIdxOne !== -1 || this.state.selectedIdxTwo !== -1){
          this.setState({array: array, selectedIdxOne: -1, selectedIdxTwo: -1})
        }

        
        this.selectionSort(array, left, i + 1, minI)
      }

    }, this.state.timeout)

  }


   /**
   *  Unfortunately, React requires that these algorithms are all soleley written recursively
   * 
   *  So this is my Bubble Sort that accomplishes a 'double for loop' via recursion
   */
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

          this.reset(array)
        }
        
        
      }else if(j >= array.length){
        this.bubbleSort(array, i + 1, 0, didSwap)
        
      }else{
        if(array[j] > array[j + 1]){
          this.swap(array, j, j + 1)
          didSwap = true
              
        }

        if(this.state.timeout !== 0)
          this.setState({array: array, selectedIdxOne: i, selectedIdxTwo: j})
        else if(this.state.selectedIdxOne !== -1 || this.state.selectedIdxTwo !== -1)
          this.setState({array: array, selectedIdxOne: -1, selectedIdxTwo: -1})


        this.bubbleSort(array, i, j + 1, didSwap)
      }

    }, this.state.timeout)

  }



  swap = (array, i, j) =>{
    var swapI, swapJ
    swapI = i
    swapJ = j

    if(this.state.timeout !== 0 && this.state.swapI !== -1 || this.state.swapJ !== -1){
      this.setState({swapI: -1, swapJ: -1})

    } else if (this.state.swapI !== swapI || this.state.swapJ !== swapJ){
      this.setState({swapI: swapI, swapJ: swapJ})

      setTimeout(() =>{
        var temp = array[i]
        array[i] = array[j]
        array[j] = temp

        if (this.state.swapI !== -1 || this.state.swapJ !== -1){
          this.setState({swapI: -1, swapJ: -1})
        }

      }, this.state.timeout)
    }

  }

  reset = (array) =>{
    this.setState({sorting: false, array: array, selectedIdxOne: -1, selectedIdxTwo: -1, selectedIdxThree: -1, swapI: -1, swapJ: -1, timeout: defaultTimeout})
  }

}

export default App;
