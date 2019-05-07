//Regular javascript class that acts as the model
//contains the logic to determine the diagnosis according 
//to the three criteria

class Diagnosis {

    constructor(selections){
        this.selections = selections;
    };

    calculateDiagnosis(){

        let UMNLevel = this.calcHighestLevel("umn");
        let LMNLevel = this.calcHighestLevel("lmn");

        let regionsWithUMN = this.countRegions("umn");
        let regionsWithLMN = this.countRegions("lmn");

        let spinalRegionsWithUMN = this.countSpinalRegions("umn");
        let spinalRegionsWithLMN = this.countSpinalRegions("lmn");

        let UMNAndLMNInBrainstem = this.containsTwoFindingsInOneRegion("umn", "lmn", "brainstem");

        //Definite ALS
        if ((UMNAndLMNInBrainstem && spinalRegionsWithUMN >= 2 && spinalRegionsWithLMN >= 2) ||
                (spinalRegionsWithUMN === 3 && spinalRegionsWithLMN === 3)) {
                return "Definite ALS"
            };

        //Probable ALS
        if ((regionsWithUMN >= 2 && regionsWithLMN >= 2) &&
                ((UMNLevel < LMNLevel) || this.selections.tilt)) {
                     return "Probable ALS" 
            };

        //Possible ALS
        if (this.areBothFindingsPresentInOneRegion() ||
                (regionsWithUMN >= 2 && regionsWithLMN === 0) ||
                (UMNLevel > LMNLevel && UMNLevel !== 5)) {
                return "Possible ALS"
            };

        //Suspected ALS
        if (regionsWithLMN >= 2) {
            return "Suspected ALS"
            };

        return "--";
    };

    calcHighestLevel(finding){
        for (let i=0; i<this.selections.regions.length; i++){
            if(this.selections.regions[i][finding]){
                return i+1;
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

export default Diagnosis;