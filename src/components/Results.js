import React from 'react'
import ListItem from './ListItem';

const Results = ({ results }) => {
  const listItems = results?.data?.results && results.data.results.map((result) => (
    <ListItem key={result.id} result={result} />
  ));

  return (
    <ul>{listItems ? listItems : "No results."}</ul>
  )
}

export default Results