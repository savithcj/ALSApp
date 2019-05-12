import React from 'react';
import './DiagnosisResults.css'

const diagnosisResults = (props) => {
    return (
        <div>
            <div className = "criteriaName">
                {props.title}
            </div>
            <div className = "diagnosis">
                {props.diagnosis}
            </div>
            <div className = "explanation">
                <p>
                    {props.explanation}
                </p>
                <p>
                    {props.additionalInfo}
                </p>
            </div>
        </div>

    );
};

export default diagnosisResults;