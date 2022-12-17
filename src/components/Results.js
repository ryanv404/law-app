import React from 'react';
import ListItem from './ListItem';

const Results = ({ resultsList, numResults }) => {
  const listItems = resultsList.map((item) => (
    <ListItem key={item.id} data={item} />
  ));

  return (
    <div>
      <p>{`Found ${numResults} ${numResults === 1 ? "result" : "results"}.`}</p>
      <h3>Search results:</h3>
      <ul>{listItems ? listItems : "No results found."}</ul>
    </div>
  )
};

export default Results