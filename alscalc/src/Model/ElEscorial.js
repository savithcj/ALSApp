class ElEscorial {
  constructor(selections) {
    this.selections = selections;

    this.UMNLevel = this.calcHighestLevel("umn");
    this.LMNLevel = this.calcHighestLevel("lmn");

    this.regionsWithUMN = this.countRegions("umn");
    this.regionsWithLMN = this.countRegions("lmn");

    this.spinalRegionsWithUMN = this.countSpinalRegions("umn");
    this.spinalRegionsWithLMN = this.countSpinalRegions("lmn");

    this.UMNAndLMNInBrainstem = this.containsTwoFindingsInOneRegion("umn", "lmn", "Brainstem");
  }

  calculateDiagnosis() {
    if (this.UMNAndLMNInBrainstem && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMN >= 2) {
      return {
        diagnosis: "Definite ALS",
        explanation: `This scenario is classified as definite ALS as there are upper motor 
                    neuron and lower motor neuron findings in the brainstem in addition to upper motor 
                    neuron and lower motor neuron signs in two or more spinal regions.`
      };
    }

    if (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMN === 3) {
      return {
        diagnosis: "Definite ALS",
        explanation: `This scenario is classified as Definite ALS as there are upper motor 
                    neuron and lower motor neuron findings in all three spinal regions.`
      };
    }

    if (this.regionsWithUMN >= 2 && this.regionsWithLMN >= 2 && this.UMNLevel < this.LMNLevel) {
      return {
        diagnosis: "Probable ALS",
        explanation: `This scenario is classified as Probable ALS as there are upper motor 
                    neuron and lower motor neuron findings in two or more regions and some upper motor 
                    neuron signs are rostral to lower motor neuron signs.`
      };
    }

    if (
      this.regionsWithUMN >= 2 &&
      this.regionsWithLMN >= 2 &&
      (this.UMNLevel < this.LMNLevel || this.selections.tilt)
    ) {
      return {
        diagnosis: "Probable ALS",
        explanation: `This scenario is classified as Probable ALS as there are upper motor 
                    neuron and lower motor neuron findings in two or more regions and some upper motor 
                    neuron signs are rostral to lower motor neuron signs.`
      };
    }

    if (this.areBothFindingsPresentInOneRegion()) {
      return {
        diagnosis: "Possible ALS",
        explanation: `This scenario is classified as Possible ALS as there are upper motor 
                    neuron and lower motor neuron signs “together” in one region.`
      };
    }

    if (this.regionsWithUMN >= 2 && this.regionsWithLMN == 0) {
      return {
        diagnosis: "Possible ALS",
        explanation: `This scenario is classified as Possible ALS as there are upper motor
                     neuron signs “alone” in two or more regions.`
      };
    }

    if (this.regionsWithUMN >= 2 && this.regionsWithLMN > 0) {
      return {
        diagnosis: "Possible ALS or NIL - Please see explanation below",
        explanation: `This scenario is classified as Possible ALS as there are upper motor
                     neuron signs “alone” in two or more regions. We interpret “alone” as meaning that
                     these findings “on their own” would satisfy the criteria for possible ALS. If we interpret 
                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the El 
                     Escorial criteria classification scheme.`
      };
    }

    if (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 1 && this.regionsWithLMN > 1) {
      return {
        diagnosis: "Possible ALS",
        explanation: `This scenario is classified as Possible ALS as lower motor neuron 
                    signs are rostral to upper motor neuron signs.`
      };
    }

    if (this.regionsWithLMN >= 2) {
      return {
        diagnosis: "Suspected ALS",
        explanation: `This scenario is classified as Suspected ALS as there are lower 
                    motor neuron signs in two or more regions.`
      };
    }

    return {
      diagnosis: "--",
      explanation: `A valid diagnosis is not available for the selected findings based
                    on the El Escorial criteria.`
    };
  }

  calcHighestLevel(finding) {
    for (let i = 0; i < this.selections.regions.length; i++) {
      if (this.isFindingPresent(finding, this.selections.regions[i].id)) {
        return i;
      }
    }
    return 5;
  }

  countRegions(finding) {
    let count = 0;
    for (let i = 0; i < this.selections.regions.length; i++) {
      count += this.isFindingPresent(finding, this.selections.regions[i].id);
    }

    return count;
  }

  countSpinalRegions(finding) {
    return this.countRegions(finding) - this.selections.regions[0][finding];
  }

  containsTwoFindingsInOneRegion(finding1, finding2, region) {
    return this.isFindingPresent(finding1, region) && this.isFindingPresent(finding2, region);
  }

  areBothFindingsPresentInOneRegion() {
    for (let i = 0; i < this.selections.regions.length; i++) {
      if (this.containsTwoFindingsInOneRegion("umn", "lmn", this.selections.regions[i].id)) {
        return true;
      }
    }
    return false;
  }

  isFindingPresent(finding, region) {
    return this.isPhysicalFindingPresent(finding, region);
  }

  isPhysicalFindingPresent(finding, region) {
    const regionIndex = this.selections.regions.findIndex(r => {
      return r.id === region;
    });

    return this.selections.regions[regionIndex][finding];
  }
}

export default ElEscorial;
