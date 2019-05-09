import React, { Component } from 'react';
import './App.css';
import {Toggle} from "react-toggle-component"
import Results from './Model/Results'
import ElEscoral from './Model/ElEscoral'
import AirlieHouse from './Model/AirlieHouse'
import AwajiShima from './Model/AwajiShima'

class App extends Component {

  constructor(){
    super();
    this.results = new Results();
    this.elEDiag = "";
    this.airlieDiag = "";
    this.awajiDiag = "";
  };

  state = {
    
      regions: [
      {id: "Brainstem", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "Cervical", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "Thoracic", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false},
      {id: "Lumbosacral", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false}],

      gene:false,
      tilt:false,

      showPhysical: false,
      showLab: false,
      showDiagnosisCriteria: false,
      isTiltNeeded: false,
      showResults:false,

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

  geneButtonHandler = (event)=> {
    this.setState({gene:event.target.checked})
  };

  tiltButtonHandler = (event) => {
    this.setState({tilt:event.target.checked})
    this.showResults();
  };

  togglePhysicalHandler = () => {
    const doesShow = this.state.showPhysical
    this.setState({showPhysical: !doesShow});
  };

  toggleLabHandler = () => {
    const doesShow = this.state.showLab
    this.setState({showLab: !doesShow});
  };

  resultsHandler = () => {
    const awaji = new AwajiShima(this.state);

    this.results.setDiagnosisStrategy(awaji);

    this.setState({isTiltNeeded:this.results.diagnosis.UMNAndLMNSignsAtSameLevel});

    this.showResults();

  };


  showResults(){
    const elE = new ElEscoral(this.state);
    const airlie = new AirlieHouse(this.state);
    const awaji = new AwajiShima(this.state);

    this.results.setDiagnosisStrategy(elE);

    this.elEDiag = this.results.result;

    this.results.setDiagnosisStrategy(airlie);

    this.airlieDiag = this.results.result;

    this.results.setDiagnosisStrategy(awaji);

    this.awajiDiag = this.results.result;

    this.setState({showResults:true});
  };

  render(){

    let physicalComponent = null;

    if (this.state.showPhysical) {
       physicalComponent = (
          <div>
            {this.state.regions.map((region)=>{
            return (
              <div key={region.id}>
                <span className="regionName">
                  {region.id}
                </span>
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
                <span className="regionName">
                  {region.id}
                </span>
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
            <span>
              Gene
              <Toggle
                name = "gene"
                onChange = {(event) => this.geneButtonHandler(event)}
                checked = {this.state.gene}
              />
            </span>
          </div>
      )

    };

    let results = null;

    if (this.state.showResults){
      results = (

          <div>
            ElEscoral: {this.elEDiag} <br/>
            AirlieHouse: {this.airlieDiag} <br/>
            AwajiShima: {this.awajiDiag} 
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
        

        <button 
          onClick={this.toggleLabHandler}>
          Lab
        </button>
        

        <button
          onClick={this.resultsHandler}>
          Results
        </button>
        {this.state.isTiltNeeded ? <span>
              Tilt
              <Toggle
                name = "tilt"
                onChange = {(event) => this.tiltButtonHandler(event)}
                checked = {this.state.tilt}
              />
            </span> : null}

            {/* <div>
              Physical <br/>
              <span>
                Region
              </span>

              <span>
                Upper 
                Motor 
                Finding
              </span>

              <div>
                Lower Motor Finding
              </div>

            </div> */}

          {physicalComponent}
          {labComponent}
          {results}

      </div>
    );

  };

};

export default App;