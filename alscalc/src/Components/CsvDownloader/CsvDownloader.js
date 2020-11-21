import Button from "@material-ui/core/Button";
import React from "react";

/**
 * ## Csv Downloader
 * Creates a button to allow exporting of data as a .csv file
 *
 * ### Expected props
 * - colNames: string[] - array of strings used as the column names of the exported file
 * - data: Object[] - array of objects used as the data rows of the csv file. Each object of the array must have the same keys
 * as specified in the colNames array. I.e., Object.keys(data[0]).sort() === colNames.sort()
 * - filename: string - default filename of the export file
 * - skipHeader: boolean - Specify whether to skip the header row. If undefined, header row will **not** be skipped
 */
export default function CsvDownloader(props) {
  function downloadCSV(csv) {
    const csvFile = new Blob([csv], { type: "text/csv" });
    const hiddenDownloadLink = document.createElement("a");

    hiddenDownloadLink.download = props.filename || "export.csv";
    hiddenDownloadLink.href = window.URL.createObjectURL(csvFile);
    hiddenDownloadLink.style.display = "none";
    document.body.appendChild(hiddenDownloadLink);
    hiddenDownloadLink.click();
    document.body.removeChild(hiddenDownloadLink);
  }

  function handleExportOnClick() {
    if (!props.data) {
      console.error("[CsvDownloader]: data array not specified!");
      return;
    }

    if (!props.colNames) {
      console.error("[CsvDownloader]: colNames array not specified!");
      return;
    }

    const csv = [];

    if (!props.skipHeader) csv.push(props.colNames.join(","));

    props.data.forEach((datum) => {
      let rowEntry = "";

      props.colNames.forEach((colName, index) => {
        let colEntry = String(datum[colName]);

        // dealing with column entries that contain commas within them
        if (colEntry.includes(",")) colEntry = `"${colEntry}"`;

        // combine column entries to create the row entry while preventing a comma at the beginning of the entry
        rowEntry = `${rowEntry}${index ? "," : ""}${colEntry}`;
      });

      csv.push(rowEntry);
    });

    downloadCSV(csv.join("\r\n"));
  }

  return (
    <Button variant="outlined" onClick={handleExportOnClick}>
      Export CSV
    </Button>
  );
}
