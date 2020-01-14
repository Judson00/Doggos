import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    doggos: [],
    doggoText: ''
  }

  componentDidMount(){
    axios.get('https://dog.ceo/api/breed/husky/images')
    .then(res => {
      this.setState({
        doggos: res.data.message
      })
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.doggos !== prevState.doggos){
      if (this.state.doggoText === 'chihuahua'){
        axios
        .get('https://dog.ceo/api/breed/husky/images')
        .then(res => {
          this.setState({
            doggos: res.data.message,
            doggoText: 'husky'
          })
        })
        .catch(err => console.log(err))
      }
    }
  }

  handleChanges = e => {
    this.setState({
      doggoText: e.target.value
    })
  }

  fetchDoggos = e => {
    e.preventDefault()
    axios
    .get(`https://dog.ceo/api/breed/${this.state.doggoText}/images`)
    .then(res => {
      this.setState({
        doggos: res.data.message
      })
    })
    .catch(err => console.log(err))
  }

  render(){
    return (  
     <div className='App'>
       <h1>Doggos</h1>
       <input 
        type='text'
        value={this.state.doggoText}
        onChange={this.handleChanges} 
      />
      <button onClick={this.fetchDoggos}>Fetch Doggos</button>
      <div className='doggos'>
        {this.state.doggos.map(doggo => (
          <img width='200' src={doggo} alt={doggo} />
        ))}
      </div>
     </div>
    );
  }
}

export default App;
