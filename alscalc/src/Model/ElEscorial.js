class ElEscorial {

    constructor(selections){

        this.selections = selections;

        this.UMNLevel = this.calcHighestLevel("umn");
        this.LMNLevel = this.calcHighestLevel("lmn");

        this.regionsWithUMN = this.countRegions("umn");
        this.regionsWithLMN = this.countRegions("lmn");

        this.spinalRegionsWithUMN = this.countSpinalRegions("umn");
        this.spinalRegionsWithLMN = this.countSpinalRegions("lmn");

        this.UMNAndLMNInBrainstem = this.containsTwoFindingsInOneRegion("umn", "lmn", "Brainstem");
    };

    calculateDiagnosis(){

        if ((this.UMNAndLMNInBrainstem && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMN >= 2) ||
                (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMN === 3)) {
                return "Definite ALS"
            };

        if ((this.regionsWithUMN >= 2 && this.regionsWithLMN >= 2) &&
                ((this.UMNLevel < this.LMNLevel) || this.selections.tilt)) {
                    return "Probable ALS" 
            };

        if (this.areBothFindingsPresentInOneRegion() ||
                (this.regionsWithUMN >= 2) ||
                (this.UMNLevel > this.LMNLevel && this.regionsWithUMN > 0)) {
                return "Possible ALS"
            };

        if (this.regionsWithLMN >= 2) {
            return "Suspected ALS"
            };

        return "--";
    };

    calcHighestLevel(finding){
        for (let i=0; i<this.selections.regions.length; i++){
            if(this.isFindingPresent(finding, this.selections.regions[i].id)){
                return i;
            };
        };
        return 5;
    };

    countRegions(finding){
        let count =0;
        for(let i=0; i<this.selections.regions.length; i++){
           count += this.isFindingPresent(finding, this.selections.regions[i].id)
        };

        return count;
    };

    countSpinalRegions(finding){
        
        return (
            this.countRegions(finding)-this.selections.regions[0][finding]
        );
    };

    containsTwoFindingsInOneRegion(finding1, finding2, region){

        return (
            this.isFindingPresent(finding1, region) && this.isFindingPresent(finding2, region)
        );    

    };

    areBothFindingsPresentInOneRegion(){
        for(let i=0; i<this.selections.regions.length; i++){
            if(this.containsTwoFindingsInOneRegion("umn", "lmn", this.selections.regions[i].id)){
                return true;
            };
        };
        return false;
    };

    //returns true if a finding is present according to the El Escorial criteria
    isFindingPresent(finding, region){

        return this.isPhysicalFindingPresent(finding, region);

    };

    isPhysicalFindingPresent(finding, region){
        const regionIndex = this.selections.regions.findIndex(r => {
            return r.id === region;
        });

        return this.selections.regions[regionIndex][finding];
    };
};

export default ElEscorial;