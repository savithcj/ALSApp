import React from 'react';
import {Toggle} from "react-toggle-component"


const physical = (props) => {
    return (
        <div className="Physical">

            <span>
                Brainstem:
                <Toggle name="brainUMN"/>
                <Toggle name="brainLMN"/>
            </span>

            <hr />    

            <span>
                Cervical:
                <Toggle name="cervUMN"/>
                <Toggle name="cervLMN"/>
            </span>

            <hr />

            <span>
                Thoracic:
                <Toggle name="thorUMN"/>
                <Toggle name="thorLMN"/>
            </span>

            <hr />

            <span>
                Lumbosacral:
                <Toggle name="lumbUMN"/>
                <Toggle name="lumbLMN"/>
            </span>

            <hr />
            
        </div>
    )

};

export default physical;