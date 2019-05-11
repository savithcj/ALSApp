import ElEscorial from "./ElEscorial";

class AirlieHouse extends ElEscorial {

    constructor(selections){
        super(selections);

        this.regionsWithLMNByPhysicalOnly = this.countPhysicalRegions("lmn");
        this.regionsWithLMNByEMGOnly = this.countLMNRegionsByEMG();
        this.spinalRegionsWithLMNByPhysicalOnly = this.countPhysicalSpinalRegions("lmn")
        this.UMNAndLMNInBrainstemByPhysicalOnly = this.containsTwoPhysicalFindingsInOneRegion("umn", "lmn", "Brainstem");
        this.mostRostralFinding = this.findMostRostralFinding();
    };

    calculateDiagnosis(){

        if (this.regionsWithUMN >= 1 && this.regionsWithLMN >= 1 && this.selections.gene) {
            return "Clinically Definite Familial ALS - Lab Supported"
        };

        if ((this.UMNAndLMNInBrainstemByPhysicalOnly && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMNByPhysicalOnly >= 2) ||
                (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMNByPhysicalOnly === 3)) {
                return "Clinically Definite ALS"
        };

        if ((this.regionsWithUMN >= 2 && this.regionsWithLMNByPhysicalOnly >= 2) &&
                (this.mostRostralFinding === "umn" || (this.mostRostralFinding === "uncertain" && this.selections.tilt))) {
                return "Clinically Probable ALS" 
        };
        
        if ((this.regionsWithUMN === 1 && this.regionsWithLMNByEMGOnly === 1 && this.UMNLevel === this.LMNLevel) ||
                ((this.regionsWithUMN >= 1 && this.regionsWithLMNByEMGOnly >= 2) &&
                (this.mostRostralFinding === "umn" || (this.mostRostralFinding === "uncertain" && this.selections.tilt)))) { 
                return "Clinically Probable ALS - Lab Supported" 
        };

        if (this.areBothFindingsPresentInOnePhysicalRegion() ||
                (this.regionsWithUMN >= 2) ||
                (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 0)) {
                return "Clinically Possible ALS"
            }

        return "--";
    };

    findMostRostralFinding(){
        const highestUMNFinding = this.calculateHighestPhysicalLevel("umn");
        const highestLMNFinding = this.calculateHighestPhysicalLevel("lmn");

        const highestFasicsFinding = this.calculateHighestPhysicalLevel("fasics");
        const highestFibsFinding = this.calculateHighestPhysicalLevel("fibs");
        const highestChronicDenervFinding = this.calculateHighestPhysicalLevel("chronicDenerv");

        const highestEMGFinding = Math.min([highestFasicsFinding, highestFibsFinding, highestChronicDenervFinding]);

        if (highestLMNFinding < highestUMNFinding){
            return "lmn";
        };

        if (highestUMNFinding < Math.min([highestLMNFinding, highestEMGFinding])){
            return "umn";
        };

        if (highestUMNFinding === 5) {
            return "noUMN";
        };

        return "uncertain";
    };

    isTiltConfirmationNeeded(){
        return this.mostRostralFinding === "uncertain";
    };

    calculateHighestPhysicalLevel(finding){
        for (let i=0; i<this.selections.regions.length; i++){
            if(this.isPhysicalFindingPresent(finding, this.selections.regions[i].id)){
                return i;
            };
        };
        return 5;
    };

    countPhysicalRegions(finding){
        let count =0;
        for(let i=0; i<this.selections.regions.length; i++){
           count += this.isPhysicalFindingPresent(finding, this.selections.regions[i].id)
        };

        return count;
    };

    countPhysicalSpinalRegions(finding){
        return (
            this.countPhysicalRegions(finding) - this.selections.regions[0][finding]
        );
    };

    isFindingPresent(finding, region){

        if (finding === "lmn"){
            return this.isLMNFindingPresent(region);
        } else {
            return this.isPhysicalFindingPresent(finding, region);
        };
    };

    isLMNFindingPresent(region){
        const regionIndex = this.selections.regions.findIndex(r => {
            return r.id === region;
        });

        return (
            this.selections.regions[regionIndex].lmn ||
            (this.selections.regions[regionIndex].fibs && this.selections.regions[regionIndex].chronicDenerv)
        );
    };

    countLMNRegionsByEMG(){
        let count = 0;

        for(let i=0; i<this.selections.regions.length; i++){
            count += (
                this.isFindingPresent("fibs", this.selections.regions[i].id) &&
                this.isFindingPresent("chronicDenerv", this.selections.regions[i].id)
            );
         };

         return count;
    };
    containsTwoPhysicalFindingsInOneRegion(finding1, finding2, region){

        return (
            this.isPhysicalFindingPresent(finding1, region) && this.isPhysicalFindingPresent(finding2, region)
        );    

    };

    areBothFindingsPresentInOnePhysicalRegion(){
        for(let i=0; i<this.selections.regions.length; i++){
            if(this.containsTwoPhysicalFindingsInOneRegion("umn", "lmn", this.selections.regions[i].id)){
                return true;
            };
        };
        return false;
    };

};

export default AirlieHouse;