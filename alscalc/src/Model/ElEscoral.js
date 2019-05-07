class ElEscoral {

    constructor(selections){

        this.selections = selections;

        this.UMNLevel = this.calcHighestLevel("umn");
        this.LMNLevel = this.calcHighestLevel("lmn");

        this.regionsWithUMN = this.countRegions("umn");
        this.regionsWithLMN = this.countRegions("lmn");

        this.spinalRegionsWithUMN = this.countSpinalRegions("umn");
        this.spinalRegionsWithLMN = this.countSpinalRegions("lmn");

        this.UMNAndLMNInBrainstem = this.containsTwoFindingsInOneRegion("umn", "lmn", "brainstem");
    };

    calculateDiagnosis(){

        //Definite ALS
        if ((this.UMNAndLMNInBrainstem && this.spinalRegionsWithUMN >= 2 && this.spinalRegionsWithLMN >= 2) ||
                (this.spinalRegionsWithUMN === 3 && this.spinalRegionsWithLMN === 3)) {
                return "Definite ALS"
            };

        //Probable ALS
        if ((this.regionsWithUMN >= 2 && this.regionsWithLMN >= 2) &&
                ((this.UMNLevel < this.LMNLevel) || this.selections.tilt)) {
                    return "Probable ALS" 
            };

        //Possible ALS
        if (this.areBothFindingsPresentInOneRegion() ||
                (this.regionsWithUMN >= 2 && this.regionsWithLMN === 0) ||
                (this.UMNLevel > this.LMNLevel && this.UMNLevel !== -1)) {
                return "Possible ALS"
            };

        //Suspected ALS
        if (this.regionsWithLMN >= 2) {
            return "Suspected ALS"
            };

        return "--";
    };

    calcHighestLevel(finding){
        for (let i=0; i<this.selections.regions.length; i++){
            if(this.selections.regions[i][finding]){
                return i;
            };
        };
        return -1;
    };

    countRegions(finding){
        let count =0;
        for(let i=0; i<this.selections.regions.length; i++){
           count = count + this.selections.regions[i][finding]
        };

        return count;
    };

    countSpinalRegions(finding){
        return (
            this.countRegions(finding)-this.selections.regions[0][finding]
        );
    };

    containsTwoFindingsInOneRegion(finding1, finding2, region){
        const regionIndex = this.selections.regions.findIndex(r => {
            return r.id === region;
        });

        return (
            this.selections.regions[regionIndex][finding1] && this.selections.regions[regionIndex][finding2]
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
};

export default ElEscoral;