import React, { Component } from 'react';
import './App.css';
import { Toggle } from "react-toggle-component"
import Results from './Model/Results'
import ElEscorial from './Model/ElEscorial'
import AirlieHouse from './Model/AirlieHouse'
import AwajiShima from './Model/AwajiShima'
import Panel from './Components/Panel/Panel'
import Button from '@material-ui/core/Button';

class App extends Component {

  constructor(props) {

    super(props);
    this.results = new Results();
    this.elEDiag = "";
    this.airlieDiag = "";
    this.awajiDiag = "";
    this.mostRostralFinding = "";

    this.showResults = this.showResults.bind(this)
    this.yesButtonHandler = this.yesButtonHandler.bind(this)
    this.noButtonHandler = this.noButtonHandler.bind(this)
  };

  state = {

    regions: [
      { id: "Brainstem", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false },
      { id: "Cervical", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false },
      { id: "Thoracic", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false },
      { id: "Lumbosacral", umn: false, lmn: false, fibs: false, fasics: false, chronicDenerv: false }],

    gene: false,
    tilt: false,

    isTiltNeeded: null,
    revealResults: true,

  };

  changedHandler = (event, id, finding) => {

    const regionIndex = this.state.regions.findIndex(p => {
      return p.id === id;
    });

    const region = {
      ...this.state.regions[regionIndex]
    };

    switch (finding) {
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
        break;
      default:
        break;
    };

    const regions = [...this.state.regions];

    regions[regionIndex] = region;


    this.setState({ regions: regions })

  };

  geneButtonHandler = (event) => {
    this.setState({ gene: event.target.checked })
  };

  tiltButtonHandler = (event) => {
    this.setState({ tilt: event.target.checked })
  };

  yesButtonHandler = () => {
    this.setState({ tilt: true })
    this.setState({revealResults: true})
  };

  noButtonHandler = () => {
    this.setState({ tilt: false })
    this.setState({revealResults: true})
  };

  resetButtonHandler = () => {
    window.location.reload()
  };

  getmostRostralFinding = () => {

    if (this.state.isTiltNeeded) {
      switch (this.state.tilt) {
        case true:
          return `UMN findings were chosen to be rostral to LMN Findings.`;
        case false:
          return `LMN findings were chosen to be rostral to UMN Findings.`;
        default:
          return null;
      };
    };

    return (`Based on the selected values, the program has determined 
            that the most rostral findings are ` + this.mostRostralFinding);
  };

  showResults() {
    const airlie = new AirlieHouse(this.state);

    this.results.setDiagnosisStrategy(airlie);

    this.mostRostralFinding = this.results.diagnosis.mostRostralFinding

    this.setState({ isTiltNeeded: this.results.diagnosis.isTiltConfirmationNeeded() })

    if (this.results.diagnosis.isTiltConfirmationNeeded()) {
      this.setState({revealResults: false})
    } else {
      this.setState({revealResults: true})
    }

  };

  revealResults() {

    const elE = new ElEscorial(this.state);
    const airlie = new AirlieHouse(this.state);
    const awaji = new AwajiShima(this.state);

    this.results.setDiagnosisStrategy(elE);

    this.elEDiag = this.results.result;

    this.results.setDiagnosisStrategy(airlie);

    this.airlieDiag = this.results.result;

    this.results.setDiagnosisStrategy(awaji);

    this.awajiDiag = this.results.result;

  };

  render() {

    let geneMessage = `A familial history of ALS is present, and a pathogenic 
      gene mutation in the patient has been identified:`

    let findings = (
      <div className="physical">

        <div className="titles">
          <span className="region">UMN</span>
          <span className="region">LMN</span>
          <span className="region">Fibrillations/PSW</span>
          <span className="region">Fasciculations</span>
          <span className="region">Neurogenic Potentials/Chronic Denervation</span>
        </div>

        <div className="selectors">

          {this.state.regions.map((region) => {
            return (

              <div key={region.id}>
                <span className="regionName">
                  {region.id}
                </span>

                <span className="toggle">
                  <Toggle
                    name={region.id + "umn"}
                    onChange={(event) => this.changedHandler(event, region.id, 0)}
                    checked={region.umn} />
                </span>

                <span className="toggle">
                  <Toggle
                    className="toggle"
                    name={region.id + "lmn"}
                    onChange={(event) => this.changedHandler(event, region.id, 1)}
                    checked={region.lmn} />
                </span>

                <span className="toggle">
                  <Toggle
                    className="toggle"
                    name={region.id + "fibs"}
                    onChange={(event) => this.changedHandler(event, region.id, 2)}
                    checked={region.fibs} />
                </span>

                <span className="toggle">
                  <Toggle
                    className="toggle"
                    name={region.id + "fasics"}
                    onChange={(event) => this.changedHandler(event, region.id, 3)}
                    checked={region.fasics} />
                </span>

                <span className="toggle">
                  <Toggle
                    className="toggle"
                    name={region.id + "chronic"}
                    onChange={(event) => this.changedHandler(event, region.id, 4)}
                    checked={region.chronicDenerv} />
                </span>

                <hr />

              </div>

            )
          }

          )
          }

        </div>

        <div className="gene">
          <span>
            {geneMessage}
            <Toggle
              className="geneToggle"
              name="gene"
              onChange={(event) => this.geneButtonHandler(event)}
              checked={this.state.gene}
            />
          </span>


        </div>

        <div className="reset">
          <Button className="resetButton" variant="outlined" onClick={() => this.resetButtonHandler()}>
            Reset All
          </Button>

        </div>

      </div>
    );

    let diagnosisResult = null;

    if (this.state.revealResults){
      this.revealResults();
      diagnosisResult = (
        <div className="diagResults">
          {this.getmostRostralFinding()} <br/>
          ElEscorial: {this.elEDiag}
        </div>
      )
    };

    let results = null;

    if (this.state.isTiltNeeded) {

      results = (

        <div className = "results">
          <div className="tilt">
            On review, does the patient have any upper motor neuron findings rostral to (i.e above)
            lower motor neuron findings?
                <div className="tiltButtons">
              <Button variant="outlined" onClick={() => this.yesButtonHandler()}>
                Yes
                  </Button>

              <Button variant="outlined" onClick={() => this.noButtonHandler()}>
                No
                  </Button>
            </div>
          </div>

          <div>
            {diagnosisResult}
          </div>

          

        </div>
      )
    } else {

      results = (

        <div className = "results">
          <div className="tilt">
            {diagnosisResult}  
          </div>
          
        </div>
      )

    };

    return (
      <div>
        <div className="title">
          <h1>ALS Calculator</h1>
        </div>

        <Panel
          findings={findings}
          results={results}
          changed={this.showResults} />
      </div>
    );

  };

};

export default App;