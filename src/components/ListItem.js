import React from 'react';

const fortmatResponse = (res) => {
  return JSON.stringify(res, null, 2);
};

const ListItem = ({ data }) => {
  // const citationFilter = (citationsList) => {
  //   const officialCite = citationsList.filter((citation) => citation.type === "official");
  //   return officialCite ? officialCite[0].cite : citationsList[0].cite
  // };

  // const citation = citationFilter(data.citations);

  // const caseFormat = {
  //   "name": data.name,
  //   "reporter": data.reporter.full_name,
  //   "court": data.court.name,
  // };

  // const singleCase = `${data.name_abbreviation}, ${citation} (${data.court.name_abbreviation} ${data.decision_date})`

  return (
    <li>
      {/* <p>{singleCase} - <a href={`${data.frontend_url}`}>Online text</a> - <a href={`${data.frontend_pdf_url}`}>PDF</a></p> */}
      <pre>{fortmatResponse(data)}</pre>
    </li>
  )
}

export default ListItem