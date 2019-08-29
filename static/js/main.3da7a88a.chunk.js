(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{207:function(e,n,i){},214:function(e,n,i){"use strict";i.r(n);var s=i(0),t=i.n(s),a=i(20),o=i.n(a),r=(i(91),i(83)),l=i(84),c=i(7),h=i(8),g=i(19),u=i(17),d=i(24),m=i(18),f=(i(92),i(21)),p=function(){function e(){Object(c.a)(this,e),this.diagnosis=null,this.result=null}return Object(h.a)(e,[{key:"setDiagnosisStrategy",value:function(e){this.diagnosis=e,this.result=this.diagnosis.calculateDiagnosis()}}]),e}(),y=function(){function e(n){Object(c.a)(this,e),this.selections=n,this.UMNLevel=this.calcHighestLevel("umn"),this.LMNLevel=this.calcHighestLevel("lmn"),this.regionsWithUMN=this.countRegions("umn"),this.regionsWithLMN=this.countRegions("lmn"),this.spinalRegionsWithUMN=this.countSpinalRegions("umn"),this.spinalRegionsWithLMN=this.countSpinalRegions("lmn"),this.UMNAndLMNInBrainstem=this.containsTwoFindingsInOneRegion("umn","lmn","Brainstem")}return Object(h.a)(e,[{key:"calculateDiagnosis",value:function(){return this.UMNAndLMNInBrainstem&&this.spinalRegionsWithUMN>=2&&this.spinalRegionsWithLMN>=2?{diagnosis:"Definite ALS",explanation:"This scenario is classified as definite ALS as there are upper motor \n                    neuron and lower motor neuron findings in the brainstem in addition to upper motor \n                    neuron and lower motor neuron signs in two or more spinal regions."}:3===this.spinalRegionsWithUMN&&3===this.spinalRegionsWithLMN?{diagnosis:"Definite ALS",explanation:"This scenario is classified as Definite ALS as there are upper motor \n                    neuron and lower motor neuron findings in all three spinal regions."}:this.regionsWithUMN>=2&&this.regionsWithLMN>=2&&this.UMNLevel<this.LMNLevel?{diagnosis:"Probable ALS",explanation:"This scenario is classified as Probable ALS as there are upper motor \n                    neuron and lower motor neuron findings in two or more regions and some upper motor \n                    neuron signs are rostral to lower motor neuron signs."}:this.regionsWithUMN>=2&&this.regionsWithLMN>=2&&(this.UMNLevel<this.LMNLevel||this.selections.tilt)?{diagnosis:"Probable ALS",explanation:"This scenario is classified as Probable ALS as there are upper motor \n                    neuron and lower motor neuron findings in two or more regions and some upper motor \n                    neuron signs are rostral to lower motor neuron signs."}:this.areBothFindingsPresentInOneRegion()?{diagnosis:"Possible ALS",explanation:"This scenario is classified as Possible ALS as there are upper motor \n                    neuron and lower motor neuron signs \u201ctogether\u201d in one region."}:this.regionsWithUMN>=2&&0==this.regionsWithLMN?{diagnosis:"Possible ALS",explanation:"This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions."}:this.regionsWithUMN>=2&&this.regionsWithLMN>0?{diagnosis:"Possible ALS or NIL - Please see explanation below",explanation:'This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions. We interpret \u201calone\u201d as meaning that\n                     these findings \u201con their own\u201d would satisfy the criteria for possible ALS. If we interpret \n                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the El \n                     Escorial criteria classification scheme.'}:this.UMNLevel>this.LMNLevel&&this.regionsWithUMN>1&&this.regionsWithLMN>1?{diagnosis:"Possible ALS",explanation:"This scenario is classified as Possible ALS as lower motor neuron \n                    signs are rostral to upper motor neuron signs."}:this.regionsWithLMN>=2?{diagnosis:"Suspected ALS",explanation:"This scenario is classified as Suspected ALS as there are lower \n                    motor neuron signs in two or more regions."}:{diagnosis:"--",explanation:"A valid diagnosis is not available for the selected findings based\n                    on the El Escorial criteria."}}},{key:"calcHighestLevel",value:function(e){for(var n=0;n<this.selections.regions.length;n++)if(this.isFindingPresent(e,this.selections.regions[n].id))return n;return 5}},{key:"countRegions",value:function(e){for(var n=0,i=0;i<this.selections.regions.length;i++)n+=this.isFindingPresent(e,this.selections.regions[i].id);return n}},{key:"countSpinalRegions",value:function(e){return this.countRegions(e)-this.selections.regions[0][e]}},{key:"containsTwoFindingsInOneRegion",value:function(e,n,i){return this.isFindingPresent(e,i)&&this.isFindingPresent(n,i)}},{key:"areBothFindingsPresentInOneRegion",value:function(){for(var e=0;e<this.selections.regions.length;e++)if(this.containsTwoFindingsInOneRegion("umn","lmn",this.selections.regions[e].id))return!0;return!1}},{key:"isFindingPresent",value:function(e,n){return this.isPhysicalFindingPresent(e,n)}},{key:"isPhysicalFindingPresent",value:function(e,n){var i=this.selections.regions.findIndex(function(e){return e.id===n});return this.selections.regions[i][e]}}]),e}(),v=function(e){function n(e){var i;return Object(c.a)(this,n),(i=Object(g.a)(this,Object(u.a)(n).call(this,e))).regionsWithLMNByPhysicalOnly=i.countPhysicalRegions("lmn"),i.regionsWithLMNByEMGOnly=i.countLMNRegionsByEMG(),i.spinalRegionsWithLMNByPhysicalOnly=i.countPhysicalSpinalRegions("lmn"),i.UMNAndLMNInBrainstemByPhysicalOnly=i.containsTwoPhysicalFindingsInOneRegion("umn","lmn","Brainstem"),i.mostRostralFinding=i.findMostRostralFinding(),i}return Object(m.a)(n,e),Object(h.a)(n,[{key:"calculateDiagnosis",value:function(){return console.log("UMN regions: "+this.regionsWithUMN),console.log("LMN regions: "+this.regionsWithLMN),console.log("EMG LMN regions: "+this.regionsWithLMNByEMGOnly),console.log("Most rostal: "+this.mostRostralFinding),this.regionsWithUMN>=1&&this.regionsWithLMN>=1&&this.selections.gene?{diagnosis:"Clinically Definite Familial ALS - Lab Supported",explanation:"This scenario is classified as Clinically Definite Familial\n                    ALS - Laboratory Supported as there are upper and lower motor neuron signs\n                    in at least a single region as well as a family history of a defined \n                    pathogenic mutation."}:this.UMNAndLMNInBrainstemByPhysicalOnly&&this.spinalRegionsWithUMN>=2&&this.spinalRegionsWithLMNByPhysicalOnly>=2?{diagnosis:"Clinically Definite ALS",explanation:"This scenario is classified as Clinically Definite ALS as \n                    there are upper motor neuron and lower motor neuron findings in the\n                    brainstem as well as upper motor neuron and lower motor neuron findings\n                    in two or more spinal regions."}:3===this.spinalRegionsWithUMN&&3===this.spinalRegionsWithLMNByPhysicalOnly?{diagnosis:"Clinically Definite ALS",explanation:"This scenario is classified as Clinically Definite ALS as\n                    there are upper motor neuron and lower motor neuron findings in all \n                    three spinal regions."}:this.regionsWithUMN>=2&&this.regionsWithLMNByPhysicalOnly>=2&&("UMN"===this.mostRostralFinding||"uncertain"===this.mostRostralFinding&&this.selections.tilt)?{diagnosis:"Clinically Probable ALS",explanation:"This scenario is classified as Clinically Probable ALS as\n                        there are upper motor neuron and lower motor neuron findings in two or \n                        more regions and some upper motor neuron signs are rostral to lower \n                        motor neuron signs."}:1===this.regionsWithUMN&&1===this.regionsWithLMNByEMGOnly&&this.UMNLevel===this.LMNLevel||this.regionsWithUMN>=1&&this.regionsWithLMNByEMGOnly>=2&&("UMN"===this.mostRostralFinding||"uncertain"===this.mostRostralFinding&&this.selections.tilt)?{diagnosis:"Clinically Probable ALS - Lab Supported",explanation:"This scenario is classified as Clinically Probable \n                        ALS - Laboratory Supported as there are clinical signs of upper \n                        motor neuron dysfunction in at least one region and lower motor \n                        neuron signs defined by EMG criteria are present in at least two \n                        regions. In addition, upper motor neuron signs are rostral to \n                        lower motor neuron signs."}:this.areBothFindingsPresentInOnePhysicalRegion()?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Clinically Possible \n                    ALS as there are upper motor neuron and lower motor neuron signs \n                    in one region."}:this.regionsWithUMN>=2&&0==this.regionsWithLMN?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions."}:this.regionsWithUMN>=2&&this.regionsWithLMN>0?{diagnosis:"Clinically Possible ALS or NIL - Please see explanation below",explanation:'This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions. We interpret \u201calone\u201d as meaning that\n                     these findings \u201con their own\u201d would satisfy the criteria for possible ALS. If we interpret \n                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the El Escorial Revised (Airlie House)\n                     criteria classification scheme.'}:this.UMNLevel>this.LMNLevel&&this.regionsWithUMN>1&&this.regionsWithLMN>1?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Clinically Possible \n                    ALS as lower motor neuron signs are rostral to upper motor \n                    neuron signs."}:{diagnosis:"--",explanation:"A valid diagnosis is not available for the selected findings based\n                on the El Escorial revised (Airlie House) criteria."}}},{key:"findMostRostralFinding",value:function(){var e=this.calculateHighestPhysicalLevel("umn"),n=this.calculateHighestPhysicalLevel("lmn"),i=this.calculateHighestPhysicalLevel("fasics"),s=this.calculateHighestPhysicalLevel("fibs"),t=this.calculateHighestPhysicalLevel("chronicDenerv"),a=Math.min.apply(Math,[i,s,t]);return n<e?"LMN":e<Math.min.apply(Math,[n,a])?"UMN":5===e?"not selected":"uncertain"}},{key:"isTiltConfirmationNeeded",value:function(){return"uncertain"===this.mostRostralFinding}},{key:"calculateHighestPhysicalLevel",value:function(e){for(var n=0;n<this.selections.regions.length;n++)if(this.isPhysicalFindingPresent(e,this.selections.regions[n].id))return n;return 5}},{key:"countPhysicalRegions",value:function(e){for(var n=0,i=0;i<this.selections.regions.length;i++)n+=this.isPhysicalFindingPresent(e,this.selections.regions[i].id);return n}},{key:"countPhysicalSpinalRegions",value:function(e){return this.countPhysicalRegions(e)-this.selections.regions[0][e]}},{key:"isFindingPresent",value:function(e,n){return"lmn"===e?this.isLMNFindingPresent(n):this.isPhysicalFindingPresent(e,n)}},{key:"isLMNFindingPresent",value:function(e){var n=this.selections.regions.findIndex(function(n){return n.id===e});return this.selections.regions[n].lmn||this.selections.regions[n].fibs&&this.selections.regions[n].chronicDenerv}},{key:"countLMNRegionsByEMG",value:function(){for(var e=0,n=0;n<this.selections.regions.length;n++)e+=this.isFindingPresent("fibs",this.selections.regions[n].id)&&this.isFindingPresent("chronicDenerv",this.selections.regions[n].id);return e}},{key:"containsTwoPhysicalFindingsInOneRegion",value:function(e,n,i){return this.isPhysicalFindingPresent(e,i)&&this.isPhysicalFindingPresent(n,i)}},{key:"areBothFindingsPresentInOnePhysicalRegion",value:function(){for(var e=0;e<this.selections.regions.length;e++)if(this.containsTwoPhysicalFindingsInOneRegion("umn","lmn",this.selections.regions[e].id))return!0;return!1}}]),n}(y),N=function(e){function n(){return Object(c.a)(this,n),Object(g.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(m.a)(n,e),Object(h.a)(n,[{key:"calculateDiagnosis",value:function(){return this.regionsWithUMN>=1&&this.regionsWithLMN>=1&&this.selections.gene?{diagnosis:"Clinically Definite Familial ALS - Lab Supported",explanation:"This scenario is classified as Clinically Definite Familial \n                    ALS - Laboratory Supported as there are upper and lower motor neuron signs \n                    in at least a single region as well as a family history of a defined \n                    pathogenic mutation."}:this.UMNAndLMNInBrainstem&&this.spinalRegionsWithUMN>=2&&this.spinalRegionsWithLMN>=2?{diagnosis:"Clinically Definite ALS",explanation:"This scenario is classified as Clinically Definite ALS \n                    as there are upper motor neuron and lower motor neuron findings in \n                    the brainstem as well as upper motor neuron and lower motor neuron \n                    findings in two or more spinal regions."}:3===this.spinalRegionsWithUMN&&this.spinalRegionsWithLMN>=3?{diagnosis:"Clinically Definite ALS",explanation:"This scenario is classified as Clinically Definite ALS as there are \n                    upper motor neuron and lower motor neuron findings in all three spinal regions."}:this.regionsWithUMN>=2&&this.regionsWithLMN>=2&&("UMN"===this.mostRostralFinding||"uncertain"===this.mostRostralFinding&&this.selections.tilt)?{diagnosis:"Clinically Probable ALS",explanation:"This scenario is classified as Clinically Probable ALS as there \n                are upper motor neuron and lower motor neuron findings in two or more regions \n                and some upper motor neuron signs are rostral to lower motor neuron signs."}:this.areBothFindingsPresentInOneRegion()?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Clinically Possible ALS as \n                there are upper motor neuron and lower motor neuron signs together in one region."}:this.regionsWithUMN>=2&&0==this.regionsWithLMN?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions."}:this.regionsWithUMN>=2&&this.regionsWithLMN>0?{diagnosis:"Clinically Possible ALS or NIL - Please see explanation below",explanation:'This scenario is classified as Possible ALS as there are upper motor\n                     neuron signs \u201calone\u201d in two or more regions. We interpret \u201calone\u201d as meaning that\n                     these findings \u201con their own\u201d would satisfy the criteria for possible ALS. If we interpret \n                     "alone" to mean absolutely NO lower motor neuron signs are present, the pattern would not fit within the Awaji-Shima\n                     criteria classification scheme.'}:this.UMNLevel>this.LMNLevel&&this.regionsWithUMN>1&&this.regionsWithLMN>1?{diagnosis:"Clinically Possible ALS",explanation:"This scenario is classified as Clinically Possible ALS \n                as lower motor neuron signs are rostral to upper motor neuron signs and\n                the diagnosis of Clinically Probable ALS \u2013 Laboratory supported cannot \n                be proven by evidence on clinical grounds in conjunction with \n                electrodiagnostic, neurophysiologic, neuroimaging or clinical laboratory \n                studies."}:{diagnosis:"--",explanation:"A valid diagnosis is not available for the selected findings based\n                on the Awaji-Shima criteria."}}},{key:"isLMNFindingPresent",value:function(e){var n=this.selections.regions.findIndex(function(n){return n.id===e});return this.selections.regions[n].lmn||this.selections.regions[n].chronicDenerv&&(this.selections.regions[n].fasics||this.selections.regions[n].fibs)}}]),n}(v),b=i(79),L=i.n(b),w=i(47),M=i.n(w),S=i(78),P=i.n(S),A={tabs:{background:"#bfbfbf",bottom:"0px"},slide:{padding:85,minHeight:100,color:"#000",display:"flex",justifyContent:"center"}},E=function(e){function n(){var e,i;Object(c.a)(this,n);for(var s=arguments.length,t=new Array(s),a=0;a<s;a++)t[a]=arguments[a];return(i=Object(g.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(t)))).state={index:0},i.handleChange=function(e,n){i.setState({index:n}),i.props.changed()},i.handleChangeIndex=function(e){i.setState({index:e})},i}return Object(m.a)(n,e),Object(h.a)(n,[{key:"render",value:function(){var e=this.state.index;return t.a.createElement("div",null,t.a.createElement(P.a,{index:e,onChangeIndex:this.handleChangeIndex},t.a.createElement("div",{style:Object.assign({},A.slide,A.slide1)},this.props.findings),t.a.createElement("div",{style:Object.assign({},A.slide,A.slide3)},this.props.results)),t.a.createElement(L.a,{value:e,variant:"fullWidth",onChange:this.handleChange,style:A.tabs},t.a.createElement(M.a,{label:"Findings"}),t.a.createElement(M.a,{label:"Results"})))}}]),n}(t.a.Component),R=(i(207),function(e){return t.a.createElement("div",null,t.a.createElement("div",{className:"criteriaName"},e.title),t.a.createElement("div",{className:"diagnosis"},e.diagnosis),t.a.createElement("div",{className:"explanation"},e.explanation," ",t.a.createElement("br",null),e.additionalInfo))}),W=i(35),C=i.n(W),O=i(81),k=i(82),x=i.n(k),F=i(44),T=i.n(F),D=(Object(O.createMuiTheme)({palette:{primary:x.a,secondary:T.a}}),function(e){function n(e){var i;return Object(c.a)(this,n),(i=Object(g.a)(this,Object(u.a)(n).call(this,e))).state={regions:[{id:"Brainstem",umn:!1,lmn:!1,fibs:!1,fasics:!1,chronicDenerv:!1},{id:"Cervical",umn:!1,lmn:!1,fibs:!1,fasics:!1,chronicDenerv:!1},{id:"Thoracic",umn:!1,lmn:!1,fibs:!1,fasics:!1,chronicDenerv:!1},{id:"Lumbosacral",umn:!1,lmn:!1,fibs:!1,fasics:!1,chronicDenerv:!1}],gene:!1,tilt:!1,isTiltNeeded:null,revealResults:!0,yesColor:"default",noColor:"default"},i.changedHandler=function(e,n,s){var t=i.state.regions.findIndex(function(e){return e.id===n}),a=Object(l.a)({},i.state.regions[t]);switch(s){case 0:a.umn=e.target.checked;break;case 1:a.lmn=e.target.checked;break;case 2:a.fibs=e.target.checked;break;case 3:a.fasics=e.target.checked;break;case 4:a.chronicDenerv=e.target.checked}var o=Object(r.a)(i.state.regions);o[t]=a,i.setState({regions:o})},i.geneButtonHandler=function(e){i.setState({gene:e.target.checked})},i.tiltButtonHandler=function(e){i.setState({tilt:e.target.checked})},i.yesButtonHandler=function(){i.setState({tilt:!0,revealResults:!0,yesColor:"primary",noColor:"default"})},i.noButtonHandler=function(){i.setState({tilt:!1,revealResults:!0,yesColor:"default",noColor:"primary"})},i.resetButtonHandler=function(){window.location.reload()},i.getmostRostralFinding=function(){if(i.state.isTiltNeeded)switch(i.state.tilt){case!0:return"The most rostral findings were chosen to be UMN.";case!1:return"The most rostral findings were chosen to be LMN.";default:return null}return"Based on the selected values, the program determined \n            that the most rostral findings were "+i.mostRostralFinding+"."},i.results=new p,i.elEDiag=null,i.airlieDiag=null,i.awajiDiag=null,i.mostRostralFinding="",i.showResults=i.showResults.bind(Object(d.a)(i)),i.yesButtonHandler=i.yesButtonHandler.bind(Object(d.a)(i)),i.noButtonHandler=i.noButtonHandler.bind(Object(d.a)(i)),i}return Object(m.a)(n,e),Object(h.a)(n,[{key:"showResults",value:function(){this.setState({yesColor:"default",noColor:"default"});var e=new v(this.state);this.results.setDiagnosisStrategy(e),this.mostRostralFinding=this.results.diagnosis.mostRostralFinding,this.setState({isTiltNeeded:this.results.diagnosis.isTiltConfirmationNeeded()}),this.results.diagnosis.isTiltConfirmationNeeded()?this.setState({revealResults:!1}):this.setState({revealResults:!0})}},{key:"revealResults",value:function(){var e=new y(this.state),n=new v(this.state),i=new N(this.state);this.results.setDiagnosisStrategy(e),this.elEDiag=this.results.result,this.results.setDiagnosisStrategy(n),this.airlieDiag=this.results.result,this.results.setDiagnosisStrategy(i),this.awajiDiag=this.results.result}},{key:"render",value:function(){var e=this,n=t.a.createElement("div",{className:"physical"},t.a.createElement("div",{className:"titles"},t.a.createElement("span",{className:"region"},"UMN"),t.a.createElement("span",{className:"region"},"LMN"),t.a.createElement("span",{className:"region"},"Fibrillations/PSW"),t.a.createElement("span",{className:"region"},"Fasciculations"),t.a.createElement("span",{className:"region"},"Neurogenic Potentials/Chronic Denervation")),t.a.createElement("div",{className:"selectors"},this.state.regions.map(function(n){return t.a.createElement("div",{key:n.id},t.a.createElement("span",{className:"regionName"},n.id),t.a.createElement("span",{className:"toggle"},t.a.createElement(f.Toggle,{name:n.id+"umn",onChange:function(i){return e.changedHandler(i,n.id,0)},checked:n.umn})),t.a.createElement("span",{className:"toggle"},t.a.createElement(f.Toggle,{className:"toggle",name:n.id+"lmn",onChange:function(i){return e.changedHandler(i,n.id,1)},checked:n.lmn})),t.a.createElement("span",{className:"toggle"},t.a.createElement(f.Toggle,{className:"toggle",name:n.id+"fibs",onChange:function(i){return e.changedHandler(i,n.id,2)},checked:n.fibs})),t.a.createElement("span",{className:"toggle"},t.a.createElement(f.Toggle,{className:"toggle",name:n.id+"fasics",onChange:function(i){return e.changedHandler(i,n.id,3)},checked:n.fasics})),t.a.createElement("span",{className:"toggle"},t.a.createElement(f.Toggle,{className:"toggle",name:n.id+"chronic",onChange:function(i){return e.changedHandler(i,n.id,4)},checked:n.chronicDenerv})),t.a.createElement("hr",null))})),t.a.createElement("div",{className:"gene"},t.a.createElement("span",null,"A familial history of ALS is present, and a pathogenic \n      gene mutation in the patient has been identified:",t.a.createElement(f.Toggle,{className:"geneToggle",name:"gene",onChange:function(n){return e.geneButtonHandler(n)},checked:this.state.gene}))),t.a.createElement("div",{className:"reset"},t.a.createElement(C.a,{className:"resetButton",variant:"outlined",onClick:function(){return e.resetButtonHandler()}},"Reset All"))),i=null;this.state.revealResults&&(this.revealResults(),i=t.a.createElement("div",{className:"diagResults"},t.a.createElement("div",{className:"rostralFinding"},t.a.createElement("p",null,this.getmostRostralFinding())),t.a.createElement("hr",null),t.a.createElement(R,{title:"El Escorial (1994)",diagnosis:this.elEDiag.diagnosis,explanation:this.elEDiag.explanation}),t.a.createElement("hr",null),t.a.createElement(R,{title:"El Escorial Revised (Airlie House) (2000)",diagnosis:this.airlieDiag.diagnosis,explanation:this.airlieDiag.explanation}),t.a.createElement("hr",null),t.a.createElement(R,{title:"Awaji-Shima (2008)",diagnosis:this.awajiDiag.diagnosis,explanation:this.awajiDiag.explanation,additionalInfo:"Lower motor neuron (LMN) findings can include LMN clinical findings, \n                    (fibrillations/positive sharp waves AND chronic denervation), OR\n                    (fasciculations AND chronic denervation)."}),t.a.createElement("hr",null)));var s=null;return s=this.state.isTiltNeeded?t.a.createElement("div",{className:"results"},t.a.createElement("div",{className:"tilt"},"On review, does the patient have any upper motor neuron findings rostral to (i.e above) lower motor neuron findings?",t.a.createElement("div",{className:"tiltButtons"},t.a.createElement(C.a,{variant:"contained",color:this.state.yesColor,onClick:function(){return e.yesButtonHandler()}},"Yes"),t.a.createElement(C.a,{variant:"contained",color:this.state.noColor,onClick:function(){return e.noButtonHandler()}},"No"))),i):t.a.createElement("div",{className:"results"},i),t.a.createElement("div",null,t.a.createElement("div",{className:"title"},t.a.createElement("h1",null,"ALS Calculator")),t.a.createElement(E,{findings:n,results:s,changed:this.showResults}))}}]),n}(s.Component)),U=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var i=e.installing;null!=i&&(i.onstatechange=function(){"installed"===i.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(t.a.createElement(D,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/ALSApp",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/ALSApp","/service-worker.js");U?(function(e,n){fetch(e).then(function(i){var s=i.headers.get("content-type");404===i.status||null!=s&&-1===s.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):B(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):B(n,e)})}}()},86:function(e,n,i){e.exports=i(214)},91:function(e,n,i){},92:function(e,n,i){}},[[86,1,2]]]);
//# sourceMappingURL=main.3da7a88a.chunk.js.map