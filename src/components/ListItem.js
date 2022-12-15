import React from 'react'

const ListItem = ({ result }) => {
  const citationFilter = (citationsList) => {
    const officialCite = citationsList.filter((citation) => citation.type === "official");
    return officialCite ? officialCite[0].cite : citationsList[0].cite
  };

  const citation = citationFilter(result.citations);

  const caseFormat = {
    "name": result.name,
    "reporter": result.reporter.full_name,
    "court": result.court.name,
  };

  const singleCase = `${result.name_abbreviation}, ${citation} (${result.court.name_abbreviation} ${result.decision_date})`

  return (
    <li>
      <p>{singleCase} - <a href={`${result.frontend_url}`}>Online text</a> - <a href={`${result.frontend_pdf_url}`}>PDF</a></p>
      <pre>{JSON.stringify(caseFormat, null, 2)}</pre>
    </li>
  )
}

export default ListItem