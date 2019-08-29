import ElEscorial from "./ElEscorial";

class AirlieHouse extends ElEscorial {
  constructor(selections) {
    super(selections);

    this.regionsWithLMNByPhysicalOnly = this.countPhysicalRegions("lmn");
    this.regionsWithLMNByEMGOnly = this.countLMNRegionsByEMG();
    this.spinalRegionsWithLMNByPhysicalOnly = this.countPhysicalSpinalRegions("lmn");
    this.UMNAndLMNInBrainstemByPhysicalOnly = this.containsTwoPhysicalFindingsInOneRegion("umn", "lmn", "Brainstem");
    this.mostRostralFinding = this.findMostRostralFinding();
  }

  calculateDiagnosis() {
    console.log("UMN regions: " + this.regionsWithUMN);
    console.log("LMN regions: " + this.regionsWithLMN);
    console.log("EMG LMN regions: " + this.regionsWithLMNByEMGOnly);
    console.log("Most rostal: " + this.mostRostralFinding);

    if (this.regionsWithUMN >= 1 && this.regionsWithLMN >= 1 && this.selections.gene) {
      return {
        diagnosis: "Clinically Definite Familial ALS - Lab Supported",
        explanation: `This scenario is classified as Clinically Definite Familial
                    ALS - Laboratory Supported as there are upper and lower motor neuron signs
                    in at least a single region as well as a family history of a defined 
                    pathogenic mutation.`
      };
    }

    if (
      this.UMNAndLMNInBrainstemByPhysicalOnly &&
      this.spinalRegionsWithUMN >= 2 &&
      this.spinalRegionsWithLMNByPhysicalOnly >= 2
    ) {
      return {
        diagnosis: "Clinically Definite ALS",
        explanation: `This scenario is classified as Clinically Definite ALS as 
                    there are upper motor neuron and lower motor neuron findings in the
                    brainstem as well as upper motor neuron and lower motor neuron findings
                    in two or more spinal regions.`
      };
    }

    if (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMNByPhysicalOnly === 3) {
      return {
        diagnosis: "Clinically Definite ALS",
        explanation: `This scenario is classified as Clinically Definite ALS as
                    there are upper motor neuron and lower motor neuron findings in all 
                    three spinal regions.`
      };
    }

    if (
      this.regionsWithUMN >= 2 &&
      this.regionsWithLMNByPhysicalOnly >= 2 &&
      (this.mostRostralFinding === "UMN" || (this.mostRostralFinding === "uncertain" && this.selections.tilt))
    ) {
      return {
        diagnosis: "Clinically Probable ALS",
        explanation: `This scenario is classified as Clinically Probable ALS as
                        there are upper motor neuron and lower motor neuron findings in two or 
                        more regions and some upper motor neuron signs are rostral to lower 
                        motor neuron signs.`
      };
    }

    if (
      (this.regionsWithUMN === 1 && this.regionsWithLMNByEMGOnly === 1 && this.UMNLevel === this.LMNLevel) ||
      (this.regionsWithUMN >= 1 &&
        this.regionsWithLMNByEMGOnly >= 2 &&
        (this.mostRostralFinding === "UMN" || (this.mostRostralFinding === "uncertain" && this.selections.tilt)))
    ) {
      return {
        diagnosis: "Clinically Probable ALS - Lab Supported",
        explanation: `This scenario is classified as Clinically Probable 
                        ALS - Laboratory Supported as there are clinical signs of upper 
                        motor neuron dysfunction in at least one region and lower motor 
                        neuron signs defined by EMG criteria are present in at least two 
                        regions. In addition, upper motor neuron signs are rostral to 
                        lower motor neuron signs.`
      };
    }

    if (this.areBothFindingsPresentInOnePhysicalRegion()) {
      return {
        diagnosis: "Clinically Possible ALS",
        explanation: `This scenario is classified as Clinically Possible 
                    ALS as there are upper motor neuron and lower motor neuron signs 
                    in one region.`
      };
    }

    if (this.regionsWithUMN >= 2 && this.regionsWithLMN == 0) {
      return {
        diagnosis: "Clinically Possible ALS",
        explanation: `This scenario is classified as Possible ALS as there are upper motor
                     neuron signs “alone” in two or more regions.`
      };
    }

    if (this.regionsWithUMN >= 2 && this.regionsWithLMN > 0) {
      return {
        diagnosis: "Clinically Possible ALS or NIL - Please see explanation below",
        explanation: `This scenario is classified as Possible ALS as there are upper motor
                     neuron signs “alone” in two or more regions. We interpret “alone” as meaning that
                     these findings “on their own” would satisfy the criteria for possible ALS. If we interpret 
                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the El Escorial Revised (Airlie House)
                     criteria classification scheme.`
      };
    }

    if (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 1 && this.regionsWithLMN > 1) {
      return {
        diagnosis: "Clinically Possible ALS",
        explanation: `This scenario is classified as Clinically Possible 
                    ALS as lower motor neuron signs are rostral to upper motor 
                    neuron signs.`
      };
    }

    return {
      diagnosis: "--",
      explanation: `A valid diagnosis is not available for the selected findings based
                on the El Escorial revised (Airlie House) criteria.`
    };
  }

  findMostRostralFinding() {
    const highestUMNFinding = this.calculateHighestPhysicalLevel("umn");
    const highestLMNFinding = this.calculateHighestPhysicalLevel("lmn");

    const highestFasicsFinding = this.calculateHighestPhysicalLevel("fasics");
    const highestFibsFinding = this.calculateHighestPhysicalLevel("fibs");
    const highestChronicDenervFinding = this.calculateHighestPhysicalLevel("chronicDenerv");

    let highestEMGFinding = Math.min(...[highestFasicsFinding, highestFibsFinding, highestChronicDenervFinding]);

    if (highestLMNFinding < highestUMNFinding) {
      return "LMN";
    }

    if (highestUMNFinding < Math.min(...[highestLMNFinding, highestEMGFinding])) {
      return "UMN";
    }

    if (highestUMNFinding === 5) {
      return "not selected";
    }

    return "uncertain";
  }

  isTiltConfirmationNeeded() {
    return this.mostRostralFinding === "uncertain";
  }

  calculateHighestPhysicalLevel(finding) {
    for (let i = 0; i < this.selections.regions.length; i++) {
      if (this.isPhysicalFindingPresent(finding, this.selections.regions[i].id)) {
        return i;
      }
    }
    return 5;
  }

  countPhysicalRegions(finding) {
    let count = 0;
    for (let i = 0; i < this.selections.regions.length; i++) {
      count += this.isPhysicalFindingPresent(finding, this.selections.regions[i].id);
    }

    return count;
  }

  countPhysicalSpinalRegions(finding) {
    return this.countPhysicalRegions(finding) - this.selections.regions[0][finding];
  }

  isFindingPresent(finding, region) {
    if (finding === "lmn") {
      return this.isLMNFindingPresent(region);
    } else {
      return this.isPhysicalFindingPresent(finding, region);
    }
  }

  isLMNFindingPresent(region) {
    const regionIndex = this.selections.regions.findIndex(r => {
      return r.id === region;
    });

    return (
      this.selections.regions[regionIndex].lmn ||
      (this.selections.regions[regionIndex].fibs && this.selections.regions[regionIndex].chronicDenerv)
    );
  }

  countLMNRegionsByEMG() {
    let count = 0;

    for (let i = 0; i < this.selections.regions.length; i++) {
      count +=
        this.isFindingPresent("fibs", this.selections.regions[i].id) &&
        this.isFindingPresent("chronicDenerv", this.selections.regions[i].id);
    }

    return count;
  }
  containsTwoPhysicalFindingsInOneRegion(finding1, finding2, region) {
    return this.isPhysicalFindingPresent(finding1, region) && this.isPhysicalFindingPresent(finding2, region);
  }

  areBothFindingsPresentInOnePhysicalRegion() {
    for (let i = 0; i < this.selections.regions.length; i++) {
      if (this.containsTwoPhysicalFindingsInOneRegion("umn", "lmn", this.selections.regions[i].id)) {
        return true;
      }
    }
    return false;
  }
}

export default AirlieHouse;
