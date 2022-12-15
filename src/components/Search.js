import axios from 'axios';
import React, { useState } from 'react'
import Results from './Results';

const Search = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://api.case.law/v1/cases/?search=${text}`;
    const response = await axios.get(url)
    setResults(response);
  };

  return (
    <>
      <div>
        <h1>Law App</h1>
        <p>Search for a case below.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="case_search">
            <input type="text" name="case_search" id="case_search"
            onChange={(e) => setText(e.target.value)} value={text} 
            autoComplete="off"
            />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      <Results results={results}/>
    </>
  )
}

export default Search