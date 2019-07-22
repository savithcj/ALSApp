class Results {
  constructor() {
    this.diagnosis = null;
    this.result = null;
  }
  setDiagnosisStrategy(diagnosis) {
    this.diagnosis = diagnosis;
    this.result = this.diagnosis.calculateDiagnosis();
  }
}

export default Results;
