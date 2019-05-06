import React, { Component } from 'react';
import './App.css';

import Physical from './Components/Physical/Physical'

class App extends Component {
  state = {
    
      brainstem: {umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      cervical: {umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      thoracic: {umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      lumbosacral: {umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},

      gene:false,
      tilt:false,

      showPhysical: false,
      showLab: false,
      showDiagnosisCriteria: false,

  };

  togglePhysicalHandler = () => {
    const doesShow = this.state.showPhysical;
    this.setState({showPhysical: !doesShow});
  }

  render(){

    let physicalComponent = null;

    if (this.state.showPhysical) {
       physicalComponent = (
          <div>
            <Physical/>
          </div>
        )
    };

    return (
      <div>
        <h1>ALS Calculator</h1>
        <button 
          onClick={this.togglePhysicalHandler}>Physical
        </button>
        {physicalComponent}
      </div>
    );


  };

};

export default App;
