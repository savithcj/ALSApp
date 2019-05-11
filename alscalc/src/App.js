import React, { Component } from 'react';
import './App.css';
import {Toggle} from "react-toggle-component"
import Results from './Model/Results'
import ElEscoral from './Model/ElEscorial'
import AirlieHouse from './Model/AirlieHouse'
import AwajiShima from './Model/AwajiShima'
import Panel from './Components/Panel/Panel'

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


  resultsHandler = () => {
    const airlie = new AirlieHouse(this.state);

    this.results.setDiagnosisStrategy(airlie);

    this.setState({isTiltNeeded:this.results.diagnosis.isTiltConfirmationNeeded()});

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

    let geneMessage = `A familial history of ALS is present, and a pathogenic 
      gene mutation in the patient has been identified:`


      let labComponent = (

        <div className="gene">
            <span>
              {geneMessage}
              <Toggle
                className="geneToggle"
                name = "gene"
                onChange = {(event) => this.geneButtonHandler(event)}
                checked = {this.state.gene}
              />
            </span>
        </div>
      );

    let physicalComponent = null;

    if (this.state.showPhysical) {
       physicalComponent = (
          <div className="physical">
            <div className = "titles">

              <span className="region">UMN</span>
              <span className="region">LMN</span>
              <span className="region">Fibrillations/PSW</span>
              <span className="region">Fasciculations</span>
              <span className="region">Neurogenic Potentials/Chronic Denervation</span>

          </div>  

          <div className="selectors">
            {this.state.regions.map((region)=>{
            return (

              <div key={region.id}>
                <span className="regionName">
                  {region.id}
                </span>

                <span className = "toggle">
                  <Toggle
                  name={region.id + "umn"} 
                  onChange={(event) => this.changedHandler(event, region.id, 0)}
                  checked={region.umn}/>
                </span>

                <span className = "toggle">
                  <Toggle
                  className = "toggle"
                  name={region.id + "lmn"} 
                  onChange={(event) => this.changedHandler(event, region.id, 1)}
                  checked={region.lmn}/>
                </span>

                <span className = "toggle">
                  <Toggle
                  className = "toggle"
                  name={region.id + "fibs"} 
                  onChange={(event) => this.changedHandler(event, region.id, 2)}
                  checked={region.fibs}/>
                </span>

                <span className = "toggle">
                  <Toggle
                  className = "toggle"
                  name={region.id + "fasics"} 
                  onChange={(event) => this.changedHandler(event, region.id, 3)}
                  checked={region.fasics}/>
                </span>

                <span className = "toggle">
                  <Toggle
                  className = "toggle"
                  name={region.id + "chronic"} 
                  onChange={(event) => this.changedHandler(event, region.id, 4)}
                  checked={region.chronicDenerv}/> 
                </span>

                <hr />

              </div>
              
              )
          })}

              
            </div>
            {labComponent}
            

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

          {/* {physicalComponent} */}
          {/* {labComponent} */}
          {/* {results} */}

          <Panel 
            findings = {physicalComponent}
            results = {results}/>

      </div>
    );

  };

};

export default App;