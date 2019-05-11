import AirlieHouse from "./AirlieHouse";

class AwajiShima extends AirlieHouse {

    calculateDiagnosis(){

        console.log(this.UMNAndLMNInBrainstem)

        if (this.regionsWithUMN >= 1 && this.regionsWithLMN >= 1 && this.selections.gene) { 
            return "Clinically Definite Familial ALS\nThis was determined becauase UMN > LMN";
        };

        if ((this.UMNAndLMNInBrainstem && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMN >= 2) ||
                (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMN === 3)) { 
            return "Clinically Definite ALS"; 
        };

        if ((this.regionsWithUMN >= 2 && this.regionsWithLMN >= 2) &&
            (this.mostRostralFinding === "umn" || (this.mostRostralFinding === "uncertain" && this.selections.tilt))) {
            return "Clinically Probable ALS";
        };

        if (this.areBothFindingsPresentInOneRegion() ||
                (this.regionsWithUMN >= 2) || 
                (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 0)) {
            return "Clinically Possible ALS";
        };
            
        return "--";
    };

    isLMNFindingPresent(region){
        const regionIndex = this.selections.regions.findIndex(r => {
            return r.id === region;
        });

        return (
            this.selections.regions[regionIndex].lmn ||
            (this.selections.regions[regionIndex].chronicDenerv && 
                (this.selections.regions[regionIndex].fasics || this.selections.regions[regionIndex].fibs))
        );
    };

};

export default AwajiShima;