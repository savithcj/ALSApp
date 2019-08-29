import AirlieHouse from "./AirlieHouse";

class AwajiShima extends AirlieHouse {
  calculateDiagnosis() {
    if (this.regionsWithUMN >= 1 && this.regionsWithLMN >= 1 && this.selections.gene) {
      return {
        diagnosis: "Clinically Definite Familial ALS - Lab Supported",
        explanation: `This scenario is classified as Clinically Definite Familial 
                    ALS - Laboratory Supported as there are upper and lower motor neuron signs 
                    in at least a single region as well as a family history of a defined 
                    pathogenic mutation.`
      };
    }

    if (this.UMNAndLMNInBrainstem && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMN >= 2) {
      return {
        diagnosis: "Clinically Definite ALS",
        explanation: `This scenario is classified as Clinically Definite ALS 
                    as there are upper motor neuron and lower motor neuron findings in 
                    the brainstem as well as upper motor neuron and lower motor neuron 
                    findings in two or more spinal regions.`
      };
    }

    if (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMN >= 3) {
      return {
        diagnosis: "Clinically Definite ALS",
        explanation: `This scenario is classified as Clinically Definite ALS as there are 
                    upper motor neuron and lower motor neuron findings in all three spinal regions.`
      };
    }

    if (
      this.regionsWithUMN >= 2 &&
      this.regionsWithLMN >= 2 &&
      (this.mostRostralFinding === "UMN" || (this.mostRostralFinding === "uncertain" && this.selections.tilt))
    ) {
      return {
        diagnosis: "Clinically Probable ALS",
        explanation: `This scenario is classified as Clinically Probable ALS as there 
                are upper motor neuron and lower motor neuron findings in two or more regions 
                and some upper motor neuron signs are rostral to lower motor neuron signs.`
      };
    }

    if (this.areBothFindingsPresentInOneRegion()) {
      return {
        diagnosis: "Clinically Possible ALS",
        explanation: `This scenario is classified as Clinically Possible ALS as 
                there are upper motor neuron and lower motor neuron signs together in one region.`
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
                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the Awaji-Shima
                     criteria classification scheme.`
      };
    }

    if (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 1 && this.regionsWithLMN > 1) {
      return {
        diagnosis: "Clinically Possible ALS",
        explanation: `This scenario is classified as Clinically Possible ALS 
                as lower motor neuron signs are rostral to upper motor neuron signs and
                the diagnosis of Clinically Probable ALS – Laboratory supported cannot 
                be proven by evidence on clinical grounds in conjunction with 
                electrodiagnostic, neurophysiologic, neuroimaging or clinical laboratory 
                studies.`
      };
    }

    return {
      diagnosis: "--",
      explanation: `A valid diagnosis is not available for the selected findings based
                on the Awaji-Shima criteria.`
    };
  }

  isLMNFindingPresent(region) {
    const regionIndex = this.selections.regions.findIndex(r => {
      return r.id === region;
    });

    return (
      this.selections.regions[regionIndex].lmn ||
      (this.selections.regions[regionIndex].chronicDenerv &&
        (this.selections.regions[regionIndex].fasics || this.selections.regions[regionIndex].fibs))
    );
  }
}

export default AwajiShima;
