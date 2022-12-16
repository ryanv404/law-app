import axios from 'axios';
import React, { useState } from 'react'
// import { useQuery, useQueryClient } from 'react-query';
import Results from './Results';

const Search = () => {
  const [text, setText] = useState("");
  const [resultsList, setResultsList] = useState("")
  const [numResults, setNumResults] = useState("")

  // Search the Caselaw Access Project API
  const searchCAP = async (e) => {
    const url = `https://api.case.law/v1/cases/?search=${text}`;
    const response = await axios.get(url);
    return response;
  }

  // Search the CourtListener API
  const searchCourtListener = async (e) => {
    const url = `https://www.courtlistener.com/api/rest/v3/search/?q=${text}`;
    try {
      const response = await axios.get(url);
      return [response.data.count, response.data.results];
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [count, data] = await searchCourtListener(e);
    setResultsList(data);
    setNumResults(count);
  };

  return (
    <>
      <div>
        <h1>Law App</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="case_search">
            <input type="text" name="case_search" id="case_search"
            onChange={(e) => setText(e.target.value)} value={text} 
            autoComplete="off" placeholder="Search for a case..."
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      {/* <Results results={results}/> */}
      <p>{resultsList && `Found ${numResults} results!`}</p>
      <pre>{resultsList && JSON.stringify(resultsList, null, 2)}</pre>
    </>
  )
}

export default Search