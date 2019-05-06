import React, { Component } from 'react';
import './App.css';
import {Toggle} from "react-toggle-component"

class App extends Component {
  state = {
    
      regions: [
      {id: "brainstem", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "cervical", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "thoracic", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "lumbosacral", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false}],

      gene:false,
      tilt:false,

      showPhysical: false,
      showLab: false,
      showDiagnosisCriteria: false,

  };

  changedHandler = (event, id, finding) => {
    const regionIndex = this.state.regions.findIndex(p => {
      return p.id === id;
    });

    const region = {
      ...this.state.regions[regionIndex]
    };

    switch(finding){
      case 0:
        region.umn = event.target.checked;
        break;
      case 1:
        region.lmn = event.target.checked;
        break;
      case 2:
        region.fibs = event.target.checked;
        break;
      case 3:
        region.fasics = event.target.checked;
        break;
      case 4:
        region.chronicDenerv = event.target.checked;
    };

    const regions = [...this.state.regions];

    regions[regionIndex] = region;

    this.setState( {regions:regions} )


  };

  togglePhysicalHandler = () => {
    const doesShow = this.state.showPhysical
    this.setState({showPhysical: !doesShow});
  }

  toggleLabHandler = () => {
    const doesShow = this.state.showLab
    this.setState({showLab: !doesShow});
  }

  render(){

    let physicalComponent = null;

    if (this.state.showPhysical) {
       physicalComponent = (
          <div>
            {this.state.regions.map((region)=>{
            return (
              <div key={region.id}>
                {region.id}
            <Toggle
              name={region.id + "umn"} 
              onChange={(event) => this.changedHandler(event, region.id, 0)}
              checked={region.umn}/>

              <Toggle
              name={region.id + "lmn"} 
              onChange={(event) => this.changedHandler(event, region.id, 1)}
              checked={region.lmn}/>

              <hr />

              </div>
              
              )
          })}
          </div>
        )
    };

    let labComponent = null;

    if (this.state.showLab){

      labComponent = (

        <div>
            {this.state.regions.map((region)=>{
            return (
              <div key={region.id}>
                {region.id}
            <Toggle
              name={region.id + "fibs"} 
              onChange={(event) => this.changedHandler(event, region.id, 2)}
              checked={region.fibs}/>

              <Toggle
              name={region.id + "fasics"} 
              onChange={(event) => this.changedHandler(event, region.id, 3)}
              checked={region.fasics}/>

              <Toggle
              name={region.id + "chronic"} 
              onChange={(event) => this.changedHandler(event, region.id, 4)}
              checked={region.chronicDenerv}/>    

              <hr />

              </div>
              
              )
          })}
          </div>
      )


    };

    return (
      <div>
        <h1>ALS Calculator</h1>
        <button 
          onClick={this.togglePhysicalHandler}>
          Physical
        </button>
        {physicalComponent}

        <button 
          onClick={this.toggleLabHandler}>
          Lab
        </button>
        {labComponent}

        <button
          onClick={this.calculateHandler}>
          Calculate
        </button>
      </div>
    );


  };

};

export default App;
