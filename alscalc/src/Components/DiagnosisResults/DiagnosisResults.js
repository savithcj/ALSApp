import React from "react";
import "./DiagnosisResults.css";

const diagnosisResults = props => {
  return (
    <div>
      <div className="criteriaName">{props.title}</div>
      <div className="diagnosis">{props.diagnosis}</div>
      <div className="explanation">
        {props.explanation} <br />
        {props.additionalInfo}
      </div>
    </div>
  );
};

export default diagnosisResults;
